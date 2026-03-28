import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

function ReplicaBars({ ready, total }) {
  const bars = Array.from({ length: total }, (_, i) => i < ready);
  return (
    <div className="replicas-bar">
      {bars.map((r, i) => (
        <div key={i} className={`replica-dot ${r ? 'ready' : ''}`} />
      ))}
    </div>
  );
}

export default function DetailPanel({ ns }) {
  const [copied, setCopied] = useState(false);
  const w = ns.waypoint;

  if (!w || w.status === 'No Waypoint') return null;

  const kubectlCmd = `kubectl get gateway ${w.gatewayName} -n ${ns.metadata.name} -o yaml`;

  const handleCopy = () => {
    navigator.clipboard.writeText(kubectlCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <tr className="detail-panel">
      <td colSpan={6} style={{ padding: 0 }}>
        <div className="detail-panel-inner">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Gateway Pod</span>
              <span className="detail-value mono">{w.podName || '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gateway Name</span>
              <span className="detail-value mono">{w.gatewayName || '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Cluster IP</span>
              <span className="detail-value mono">{w.ip || '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Image</span>
              <span className="detail-value" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{w.image || '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Age</span>
              <span className="detail-value mono">{w.age || '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Replicas ({w.readyReplicas}/{w.replicas})</span>
              <span className="detail-value">
                <ReplicaBars ready={w.readyReplicas} total={w.replicas} />
              </span>
            </div>
          </div>

          <div className="kubectl-block">
            <span className="kubectl-cmd">$ {kubectlCmd}</span>
            <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {w.errorMessage && (
            <div className="error-banner">
              <span>⚠</span>
              <span>{w.errorMessage}</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
