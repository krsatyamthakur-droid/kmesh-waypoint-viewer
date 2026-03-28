import React from 'react';

export default function StatsGrid({ namespaces }) {
  const total = namespaces.length;
  const active = namespaces.filter(n => n.waypoint.status === 'Active').length;
  const pending = namespaces.filter(n => n.waypoint.status === 'Pending').length;
  const errors = namespaces.filter(n => n.waypoint.status === 'Error').length;

  const pct = (v) => total ? Math.round((v / total) * 100) : 0;

  const stats = [
    {
      label: 'Total Namespaces',
      value: total,
      cls: 'total',
      icon: '📦',
      sub: 'across cluster',
      pct: 100,
    },
    {
      label: 'Active Waypoints',
      value: active,
      cls: 'active',
      icon: '✅',
      sub: `${pct(active)}% healthy`,
      pct: pct(active),
    },
    {
      label: 'Pending',
      value: pending,
      cls: 'pending',
      icon: '⏳',
      sub: 'initializing',
      pct: pct(pending),
    },
    {
      label: 'Errors',
      value: errors,
      cls: 'error',
      icon: '⚠️',
      sub: 'need attention',
      pct: pct(errors),
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <div className="stat-header">
            <span className="stat-label">{s.label}</span>
            <span className="stat-icon">{s.icon}</span>
          </div>
          <div className={`stat-value ${s.cls}`} style={{ fontFamily: 'var(--font-syne)' }}>{s.value}</div>
          <div className="stat-progress">
            <div
              className={`stat-progress-bar ${s.cls}`}
              style={{ '--target-width': `${s.pct}%`, width: `${s.pct}%` }}
            />
          </div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
