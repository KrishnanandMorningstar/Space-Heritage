# SPACE HERITAGE — Every Mission Leaves a Story

An interactive educational digital space museum built for the **NASA Space Apps Challenge 2026**. SPACE HERITAGE preserves the scientific discoveries, engineering milestones, and current status of historic spacecraft, landers, rovers, and scientific instruments across the Moon, Mars, and deep space.

## Features (Stage 1 + Stage 2 Complete)
- **Museum Homepage:** Cinematic dark-space landing experience, three exploration wings (Moon, Mars, Deep Space), featured mission exhibits, interactive cross-mission timeline preview, and an editorial essay on why retired spacecraft matter.
- **Mission Explorer:** Live search (name, destination, NSSDCA/COSPAR ID), multi-facet filters (destination, mission type, agency, operational status), and sorting (launch date & alphabetical) across 16 verified missions.
- **15-Section Mission Detail Pages:** Reusable dossier pages with a **Quick Overview vs. Scientific / Technical View** toggle, interactive milestone timeline, NASA imagery gallery with resilient archive fallbacks, location & trajectory verification, and direct NSSDCA/NASA/JPL citations.
- **Category Wings:** Dedicated Moon Exploration (4 records), Mars Exploration (7 records), and Deep Space Exploration (5 records) pages distinguishing surface landers, rovers, helicopters, orbiters, and escaping probes.

## Technology Stack
- React 19 + TypeScript + Vite
- React Router DOM
- Tailwind CSS v4 + Modular Design Tokens (`tokens.css`, `global.css`, `layout.css`)
- Lucide React Icons
- Local structured JSON datasets (`src/data/moon.json`, `src/data/mars.json`, `src/data/deepspace.json`)

## Installation & Development Commands
```bash
npm install
npm run dev      # Start local Vite dev server on port 3000
npm run build    # Create production bundle
npm run lint     # Run TypeScript compiler check
npm run preview  # Preview production bundle locally
```

## Folder Structure
```text
space-heritage/
├── index.html
├── metadata.json
├── package.json
├── README.md
└── src/
    ├── assets/images/          # Local curated archive visuals & fallbacks
    ├── components/             # Navbar, Footer, MissionCard, Timeline, StatusBadge, MissionImage
    ├── data/                   # moon.json, mars.json, deepspace.json, index.ts
    ├── hooks/                  # useDocumentTitle.ts
    ├── pages/                  # HomePage, MissionExplorerPage, MissionDetailPage, CategoryPage, StageRoadmapPage
    ├── styles/                 # tokens.css, global.css, layout.css
    ├── types/                  # mission.ts
    ├── utils/                  # missionFormatters.ts + missionFormatters.test.ts
    ├── App.tsx
    └── main.tsx
```

## Contributing Verified Mission Data
1. Add entries to `src/data/moon.json`, `src/data/mars.json`, or `src/data/deepspace.json` matching `src/types/mission.ts`.
2. Verify all UTC dates, COSPAR IDs, instruments, coordinates, and status distinctions against primary records at:
   - NASA NSSDCA (`https://nssdc.gsfc.nasa.gov/`)
   - NASA Science (`https://science.nasa.gov/`)
   - NASA JPL (`https://www.jpl.nasa.gov/`)
   - NASA Technical Reports Server (`https://ntrs.nasa.gov/`)
   - NASA Planetary Data System (`https://pds.nasa.gov/`)
3. Never invent unknown coordinates or describe terminated deep-space probes as crashed or abandoned on planetary surfaces.
