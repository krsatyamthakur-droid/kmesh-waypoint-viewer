import React, { useState, useEffect, useMemo } from 'react';
import { mockNamespaces, mockServices } from './data/mockData';
import StatsGrid from './components/StatsGrid';
import NamespaceTable from './components/NamespaceTable';
import ServicesTab from './components/ServicesTab';
import './index.css';

const FILTERS = ['All', 'Active', 'Pending', 'Error', 'No Waypoint'];

function useTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const [tab, setTab] = useState('namespaces'); // 'namespaces' | 'services'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [namespaces, setNamespaces] = useState(mockNamespaces);
  const [installingSet, setInstallingSet] = useState(new Set());
  const time = useTime();

  // Simulate waypoint install
  const handleInstall = (nsName) => {
    setInstallingSet((prev) => new Set([...prev, nsName]));
    setTimeout(() => {
      setNamespaces((prev) =>
        prev.map((ns) =>
          ns.metadata.name === nsName
            ? {
                ...ns,
                waypoint: {
                  status: 'Active',
                  gatewayName: `${nsName}-waypoint`,
                  podName: `${nsName}-waypoint-${Math.random().toString(36).slice(2, 9)}`,
                  replicas: 1,
                  readyReplicas: 1,
                  age: '0d',
                  image: 'ghcr.io/istio/pilot:1.20.0',
                  ip: `10.96.${Math.floor(Math.random() * 200 + 50)}.${Math.floor(Math.random() * 200 + 10)}`,
                },
              }
            : ns
        )
      );
      setInstallingSet((prev) => {
        const next = new Set(prev);
        next.delete(nsName);
        return next;
      });
    }, 3000);
  };

  const filteredNamespaces = useMemo(() => {
    return namespaces.filter((ns) => {
      const matchSearch = ns.metadata.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'All' ||
        (installingSet.has(ns.metadata.name) ? statusFilter === 'Pending' : ns.waypoint.status === statusFilter);
      return matchSearch && matchStatus;
    });
  }, [namespaces, search, statusFilter, installingSet]);

  const filteredServices = useMemo(() => {
    return mockServices.filter((svc) => {
      const q = search.toLowerCase();
      return (
        svc.metadata.name.toLowerCase().includes(q) ||
        svc.metadata.namespace.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const nsCountsByStatus = useMemo(() => ({
    All: namespaces.length,
    Active: namespaces.filter((n) => n.waypoint.status === 'Active').length,
    Pending: namespaces.filter((n) => n.waypoint.status === 'Pending').length + installingSet.size,
    Error: namespaces.filter((n) => n.waypoint.status === 'Error').length,
    'No Waypoint': namespaces.filter((n) => n.waypoint.status === 'No Waypoint').length,
  }), [namespaces, installingSet]);

  const filterClass = {
    Active: 'active-filter',
    Pending: 'pending-filter',
    Error: 'error-filter',
    'No Waypoint': 'none-filter',
  };

  return (
    <div className="app-layout">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">⎈</div>
          <div>
            <div className="header-title">Kmesh Waypoint Viewer</div>
            <div className="header-subtitle">Kubernetes Service Mesh Dashboard</div>
          </div>
        </div>
        <div className="header-right">
          <div className="cluster-badge">
            <div className="cluster-badge-dot" />
            prod-cluster-01
          </div>
          <div className="header-time">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main-content">
        {/* Stats */}
        <StatsGrid namespaces={namespaces} />

        {/* Tabs */}
        <div className="tabs-bar">
          <button
            className={`tab-btn ${tab === 'namespaces' ? 'active' : ''}`}
            onClick={() => setTab('namespaces')}
          >
            📁 Namespaces
            <span className="tab-count">{namespaces.length}</span>
          </button>
          <button
            className={`tab-btn ${tab === 'services' ? 'active' : ''}`}
            onClick={() => setTab('services')}
          >
            ⚙️ Services
            <span className="tab-count">{mockServices.length}</span>
          </button>
        </div>

        {/* Search + Filters */}
        <div className="search-row">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder={tab === 'namespaces' ? 'Search namespaces…' : 'Search services / namespaces…'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {tab === 'namespaces' && FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tag ${statusFilter === f ? (filterClass[f] || 'active') : ''}`}
              onClick={() => setStatusFilter(f)}
              style={
                statusFilter === f && f === 'All'
                  ? { borderColor: 'var(--border-active)', color: 'var(--accent-blue-bright)', background: 'var(--accent-blue-glow)' }
                  : undefined
              }
            >
              {f}
              {f !== 'All' && <span style={{ fontSize: 10, marginLeft: 2, opacity: 0.7 }}>{nsCountsByStatus[f]}</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'namespaces' ? (
          <NamespaceTable
            namespaces={filteredNamespaces}
            onInstall={handleInstall}
            installingSet={installingSet}
          />
        ) : (
          <ServicesTab services={filteredServices} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <span className="footer-text">
          Kmesh Waypoint Viewer — GSoC 2025 Mini Project •{' '}
          <a
            className="footer-link"
            href="https://github.com/kmesh-net/kmesh"
            target="_blank"
            rel="noopener noreferrer"
          >
            kmesh-net/kmesh
          </a>
        </span>
        <span className="footer-text">
          API: <code style={{ color: 'var(--accent-blue-bright)' }}>v1/namespaces</code> •{' '}
          <code style={{ color: 'var(--accent-blue-bright)' }}>v1/services</code>
        </span>
      </footer>
    </div>
  );
}
