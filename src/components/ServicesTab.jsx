import React from 'react';

const LEVEL_ICONS = {
  'Namespace': '🌐',
  'Service': '⚙️',
  'Workload': '🔧',
  'None': '○',
};

export default function ServicesTab({ services }) {
  if (services.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <div className="empty-text">No services match your filter</div>
      </div>
    );
  }

  return (
    <div className="services-grid">
      {services.map((svc) => {
        const meta = svc.metadata;
        const spec = svc.spec;
        const level = svc.waypointLevel;

        return (
          <div key={meta.uid} className="service-card">
            <div className="service-card-header">
              <div>
                <div className="service-name">{meta.name}</div>
                <div className="service-ns">ns: {meta.namespace}</div>
              </div>
              <span className={`waypoint-level-badge ${level}`}>
                {LEVEL_ICONS[level]} {level}
              </span>
            </div>

            <div className="service-meta">
              <div className="service-meta-item">
                <span>Type</span>
                <strong>{spec.type}</strong>
              </div>
              <div className="service-meta-item" style={{ color: 'var(--border-subtle)' }}>•</div>
              <div className="service-meta-item">
                <span>IP</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue-bright)' }}>
                  {spec.clusterIP}
                </strong>
              </div>
            </div>

            {Object.keys(meta.labels || {}).length > 0 && (
              <div className="ns-labels" style={{ marginBottom: 10 }}>
                {Object.entries(meta.labels).map(([k, v]) => (
                  <span key={k} className="label-chip">{k}={v}</span>
                ))}
              </div>
            )}

            <div className="service-ports">
              {(spec.ports || []).map((p, i) => (
                <span key={i} className="port-chip">
                  {p.name}: {p.port}/{p.protocol}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
