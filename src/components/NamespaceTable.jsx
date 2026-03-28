import React, { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import DetailPanel from './DetailPanel';

function formatAge(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d`;
  const hours = Math.floor(diff / 3600000);
  return `${hours}h`;
}

export default function NamespaceTable({ namespaces, onInstall, installingSet }) {
  const [expandedNs, setExpandedNs] = useState(null);

  const toggle = (name) => setExpandedNs(expandedNs === name ? null : name);

  if (namespaces.length === 0) {
    return (
      <div className="ns-table-wrapper">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">No namespaces match your filter</div>
        </div>
      </div>
    );
  }

  return (
    <div className="ns-table-wrapper">
      <table className="ns-table">
        <thead>
          <tr>
            <th>Namespace</th>
            <th>Status</th>
            <th>Labels</th>
            <th>Age</th>
            <th>Waypoint</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {namespaces.map((ns) => {
            const name = ns.metadata.name;
            const isExpanded = expandedNs === name;
            const isInstalling = installingSet.has(name);
            const status = isInstalling ? 'Pending' : ns.waypoint.status;
            const hasNoWaypoint = ns.waypoint.status === 'No Waypoint' && !isInstalling;

            return (
              <React.Fragment key={name}>
                <tr
                  className={isExpanded ? 'expanded' : ''}
                  onClick={() => toggle(name)}
                >
                  <td>
                    <div className="ns-name">
                      <span>📁</span>
                      <div>
                        <div>{name}</div>
                        <div className="ns-uid">{ns.metadata.uid.slice(0, 8)}…</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={status} installing={isInstalling} />
                  </td>
                  <td>
                    <div className="ns-labels">
                      {Object.entries(ns.metadata.labels || {}).map(([k, v]) => (
                        <span key={k} className="label-chip">{k}={v}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="ns-age">{formatAge(ns.metadata.creationTimestamp)}</span>
                  </td>
                  <td>
                    {hasNoWaypoint ? (
                      <button
                        className="install-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInstall(name);
                        }}
                        disabled={isInstalling}
                      >
                        <span>⚡</span>
                        Install Waypoint
                      </button>
                    ) : isInstalling ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                        Setting up…
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                        {ns.waypoint.gatewayName || '—'}
                      </span>
                    )}
                  </td>
                  <td style={{ width: 40 }}>
                    {!hasNoWaypoint && !isInstalling && (
                      <span className={`expand-arrow ${isExpanded ? 'open' : ''}`}>▶</span>
                    )}
                  </td>
                </tr>
                {isExpanded && !hasNoWaypoint && !isInstalling && (
                  <DetailPanel ns={ns} />
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
