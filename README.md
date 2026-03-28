# ⎈ Kmesh Waypoint Status Viewer

A high-fidelity **Kubernetes Service Mesh Dashboard** built as a GSoC 2025 mini-project for **Kmesh**. This application simulates a real-world cluster management interface to visualize and manage **Waypoint Proxies** across an Istio/Kmesh-powered mesh.

![Kmesh Dashboard Screenshot](https://raw.githubusercontent.com/krsatyamthakur-droid/kmesh-waypoint-viewer/main/screenshot.png) *(Placeholder if not yet uploaded)*

## 🚀 Features

- **Real-time Status Visualization:** Monitor waypoint health (Active, Pending, Error, or No Waypoint) across all namespaces.
- **One-Click Installation:** Simulate the deployment of a waypoint proxy with a real-time progress indicator.
- **Deep Observability:** Expand any namespace to see detailed gateway pod status, IP addresses, replica counts, and container images.
- **Service-Level Analysis:** Dedicated Services tab showing waypoint mapping levels (Namespace, Service, or Workload).
- **Cluster Diagnostics:** At-a-glance cluster stats with animated progress bars for healthy vs. failing components.
- **Debug-Ready:** Integrated `kubectl` command generator for quick troubleshooting of mesh components.
- **Premium UI:** Dark-mode interface using **JetBrains Mono** and **Inter** fonts, with glassmorphism and smooth micro-animations.

## 🛠️ Tech Stack

- **Framework:** React 18+ (Vite)
- **Styling:** CSS3 (Vanilla) with Custom Design System
- **Icons:** Unicode + Custom CSS Icons
- **Mock Schema:** Matches Kubernetes `v1/Namespace` and `v1/Service` API structures.

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/krsatyamthakur-droid/kmesh-waypoint-viewer.git
   cd kmesh-waypoint-viewer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```text
src/
├── data/mockData.js         # K8s-schema-compatible mock data
├── components/
│   ├── StatsGrid.jsx        # Cluster-level metrics
│   ├── NamespaceTable.jsx   # List of namespaces & lifecycle actions
│   ├── DetailPanel.jsx      # Technical deep-dive for waypoints
│   ├── StatusBadge.jsx      # Intelligent status indicators
│   └── ServicesTab.jsx      # Service-to-waypoint mapping
├── App.jsx                  # Main interface logic
└── index.css                # Global design system & theme
```

## 🤝 Acknowledgments

Built for the **Kmesh** community as part of a GSoC 2025 proposal. For more information about Kmesh, visit [kmesh.net](https://kmesh.net).

---
*Created with ❤️ for Advanced Agentic Coding.*
