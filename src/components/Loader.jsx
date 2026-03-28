import React from 'react';

export default function Loader() {
  return (
    <div style={{
      background: "var(--bg-primary)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 13,
          color: "var(--status-active)",
          letterSpacing: "0.15em",
          marginBottom: 16,
          fontWeight: 600
        }}>
          CONNECTING TO CLUSTER
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--status-active)",
              animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
