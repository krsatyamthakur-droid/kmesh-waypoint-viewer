import React from 'react';

const STATUS_ICONS = {
  'Active': '●',
  'Pending': '◌',
  'Error': '✕',
  'No Waypoint': '○',
};

export default function StatusBadge({ status, installing = false }) {
  if (installing) {
    return (
      <span className="status-badge Pending" data-status="Pending">
        <span className="spinner" />
        Installing…
      </span>
    );
  }

  const safe = status === 'No Waypoint' ? 'no-waypoint' : status;

  return (
    <span
      className={`status-badge ${status}`}
      data-status={status}
      style={
        status === 'No Waypoint'
          ? { color: 'var(--status-none)', background: 'var(--status-none-bg)', borderColor: 'var(--status-none-border)' }
          : undefined
      }
    >
      {status === 'Active' || status === 'Error' || status === 'No Waypoint' ? (
        <span className="badge-dot" />
      ) : (
        <span className="spinner" />
      )}
      {status}
    </span>
  );
}
