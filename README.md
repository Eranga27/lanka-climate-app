# Lanka Climate Hub 🌏🌧️

Sri Lanka's enterprise-grade climate intelligence platform — real-time weather, disaster alerts, environmental monitoring, and more.

---

## Table of Contents

1. [Running Locally](#1-running-locally)
2. [Project Structure](#2-project-structure)
3. [Making Changes & Deploying to Vercel](#3-making-changes--deploying-to-vercel)
4. [The Git → Vercel Flow (Visual)](#4-the-git--vercel-flow-visual)
5. [Tech Stack](#5-tech-stack)
6. [Data Sources](#6-data-sources)

---

## 1. Running Locally

### Prerequisites

Make sure you have these installed:
- [Node.js 18+](https://nodejs.org/) — check with `node -v`
- [Git](https://git-scm.com/) — check with `git -v`

### First-time setup

```bash
# 1. Clone the repository
git clone https://github.com/Eranga27/lanka-climate-app.git

# 2. Navigate into the project
cd lanka-climate-app

# 3. Install all dependencies
npm install
```

### Start the development server

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser. The app hot-reloads automatically — any file you save instantly updates in the browser without refreshing.

### Useful commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local dev server (with hot reload) |
| `npm run build` | Build production bundle (verify before push) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Check for code issues |

> **Tip:** Always run `npm run build` before pushing if you made significant changes. If the build fails locally, it will also fail on Vercel.

---

## 2. Project Structure

```
lanka-climate-hub/
├── src/
│   ├── app/                  # Pages (each folder = one URL route)
│   │   ├── page.tsx          → /            (Home / Landing)
│   │   ├── weather/          → /weather     (Weather Intelligence)
│   │   ├── map/              → /map         (Live GIS Map)
│   │   ├── intelligence/     → /intelligence (ENSO / Climate)
│   │   ├── disaster/         → /disaster    (Disaster Centre)
│   │   ├── environment/      → /environment (Environmental)
│   │   ├── agriculture/      → /agriculture (Agriculture)
│   │   ├── marine/           → /marine      (Marine / Coastal)
│   │   ├── history/          → /history     (Historical Data)
│   │   ├── tourism/          → /tourism     (Tourism Forecast)
│   │   ├── news/             → /news        (Climate News)
│   │   ├── assistant/        → /assistant   (AI Chat)
│   │   └── about/            → /about       (About)
│   │
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, PageHeader
│   │   ├── map/              # LiveMap (Leaflet + Google tiles)
│   │   └── ui/               # Reusable UI (Card, Button, Skeleton...)
│   │
│   └── lib/
│       ├── weather.ts        # Open-Meteo API functions
│       └── utils.ts          # Utility helpers (cn, etc.)
│
├── next.config.ts            # Next.js config (Vercel-optimised)
├── vercel.json               # Vercel deployment settings
└── package.json              # Dependencies
```

---

## 3. Making Changes & Deploying to Vercel

This is the **standard workflow** you should follow every time you make a change:

### Step 1 — Make your changes

Edit any file inside `src/`. Save the file. The dev server updates instantly at `localhost:3000`.

### Step 2 — Check the build (optional but recommended)

```bash
npm run build
```

If it says `Exit code: 0` ✅ — you're safe to push.  
If it shows errors ❌ — fix them before pushing.

### Step 3 — Stage your changes

```bash
# Stage all changed files
git add .

# Or stage specific files only
git add src/app/weather/page.tsx
```

### Step 4 — Commit with a clear message

```bash
git commit -m "feat: add real-time wind speed to weather page"
```

**Commit message conventions:**
| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or enhancement |
| `fix:` | Bug fix |
| `style:` | UI/CSS-only change |
| `refactor:` | Code restructure, no feature change |
| `data:` | API or data source change |
| `docs:` | Documentation update |

### Step 5 — Push to GitHub

```bash
git push origin main
```

### 🚀 That's it — Vercel deploys automatically!

The moment you push to `main`, Vercel detects the change and:
1. Pulls your latest code
2. Runs `npm install`
3. Runs `npm run build`
4. Deploys to your live URL (usually ~30–60 seconds)

You can watch the deployment progress at:  
**https://vercel.com/dashboard** → Your project → "Deployments" tab

---

## 4. The Git → Vercel Flow (Visual)

```
Your Machine                  GitHub                    Vercel
─────────────                ────────                  ──────────────────
                             
Edit files in VS Code
        │
npm run dev (preview locally)
        │
npm run build (verify)
        │
git add .
        │
git commit -m "..."
        │
git push origin main ──────► main branch  ──────────► Auto-build starts
                                                               │
                                                        npm install
                                                               │
                                                        npm run build
                                                               │
                                                       ✅ Deploy complete!
                                                               │
                                                   Live at your Vercel URL
```

---

## 5. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Charts** | Apache ECharts via `echarts-for-react` |
| **Map** | React Leaflet + Google Maps tiles |
| **Icons** | Lucide React |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 6. Data Sources

| Source | Data Provided |
|--------|--------------|
| [Open-Meteo](https://open-meteo.com/) | Current weather, hourly & daily forecasts |
| [Open-Meteo Marine](https://open-meteo.com/) | Wave height, wave direction, wave period |
| [Open-Meteo Air Quality](https://open-meteo.com/) | AQI, PM2.5, PM10, ozone, pollutants |
| [Open-Meteo Geocoding](https://open-meteo.com/) | Location search & coordinates |
| Google Maps | Satellite, terrain, roadmap tiles |
| Sri Lanka Dept of Meteorology | Warnings & advisories (future integration) |
| NOAA | ENSO / El Niño / La Niña data (future) |
| NASA GIBS / Copernicus | Satellite imagery layers (future) |

> All Open-Meteo APIs are **free and require no API key**, making them ideal for open civic platforms.

---

## Deployed On

🔗 **Live at Vercel** — connected to `github.com/Eranga27/lanka-climate-app`  
Every push to `main` triggers an automatic deployment.
