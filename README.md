# 🌌 Nebula: Infrastructure Monitoring Dashboard

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Nebula is a cutting-edge **Real-time Observability** dashboard designed with a meticulously crafted **"Quiet Luxury"** aesthetic. Engineered for performance and clarity, it monitors complex cluster environments, transforming raw server metrics into a cohesive, fluid, and visually stunning experience.

## ✨ Features and Architecture

The application is structured to provide an instantaneous, flicker-free monitoring experience across multiple views, driven by a robust mock data engine.

### 🛠 Tech Stack

*   **Next.js (App Router)**: Leveraged for optimal structural routing, layouts, and rendering strategies. Provides seamless Client-Side Navigation across dashboard views.
*   **Tailwind CSS**: Utilized for its utility-first approach to enforce a strict, minimalist design system ("Quiet Luxury"). Colors are restrained (ultra-black backgrounds, subtle zinc accents) ensuring critical alerts pop inherently.
*   **TypeScript**: Enforces strict typings across node structures, network metrics, and contexts, guaranteeing end-to-end type safety.
*   **Recharts**: Powers the cluster performance visualizations with smooth, hardware-accelerated SVG rendering for live data streams.

### 🧠 Single Source of Truth & Logic

Nebula abandons disparate prop-drilling in favor of a unified Global Context architecture:

*   **Centralized State (`useNodeMonitor`)**: The entire orchestration of data fetching, mock generation, and state manipulation is isolated into a single React Context Provider.
*   **Synchronized Views**: Whether the user is viewing the global average AreaChart (`/`), inspecting specific node latencies (`/nodes`), or reviewing anomalies (`/alerts`), they are querying the exact same memory reference.
*   **Deterministic Failure Simulation**: The data engine applies mathematical thresholds dynamically. When a node's CPU load crosses strictly defined tiers (`CPU >= 70%` for Warning, `CPU >= 90%` for Offline), the system instantly mutates its status. This cascades downward, updating badges, resetting network graphs, and pushing the node immediately to the active Alerts view.

## ⚙️ Engineering Highlights

*   **Optimized React Hooks Architecture**: By implementing `useCallback` for the metric recalculation loop and wrapping the Context Provider's value payload in `useMemo`, we strictly prevent unnecessary re-renders in nested components (like `StatusCard` instances) even as the core interval fires every 2 seconds.
*   **Smooth Number Interpolation**: Raw metric jumps are visually jarring. A custom React component (`AnimatedNumber`) is implemented leveraging `window.requestAnimationFrame` and an *ease-out-quart* mathematical function. This ensures that when a server's CPU jumps from 15% to 85%, the UI gracefully interpolates the numbers, maintaining the premium feel of the interface without taxing React's render lifecycle.

## 🚀 Getting Started

Follow these steps to set up Nebula locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/infrastructure-dashboard.git
cd infrastructure-dashboard
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live environment monitoring in action. Navigate through the sidebar to witness the seamless context persistence across the application.

---

*Built for precision. Designed for clarity.*
