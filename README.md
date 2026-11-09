# SiteSketch — Generative Architectural & Interior Visualization SaaS

> **"From Hand-Drawn Sketch to Photorealistic Spatial Reality."**

[![Spatial Engine v2.4](https://img.shields.io/badge/Spatial%20Engine-v2.4%20Beta-06B6D4.svg)](https://sitesketch.online)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-F59E0B.svg)](https://sitesketch.online/terms)
[![Cloud Architecture](https://img.shields.io/badge/Cloud-AES--256%20Encrypted-10B981.svg)](https://sitesketch.online/privacy)

SiteSketch is a cloud-based generative architectural, interior visualization, and automated Bill-of-Materials (BOM) platform built for architects, interior design studios, and general contractors.

---

## ⚡ Core SaaS Platform Capabilities

1. **Pencil & CAD Vectorization Engine**
   - Neural OCR parses phone photos of tracing paper, napkin sketches, or raw DWG/PDF files.
   - Automatically detects load-bearing wall assemblies, door swings, and window rough openings.

2. **Photorealistic Multi-Environment Lighting**
   - Calibrated to real Kelvin color temperatures (2700K Golden Sunset to 6500K Overcast Sky).
   - Simulates physical solar azimuth angles and soft volumetric daylighting.

3. **Automatic Bill of Materials (BOM) & Takeoffs**
   - Eliminates manual spatial takeoffs.
   - Calculates itemized square footages (flooring, millwork), paint coverage, and fixture counts with direct CSV, PDF, and IFC 4.3 export.

4. **Material & Finish Swapping Sandbox**
   - Instant PBR finish swapping (e.g. European Herringbone White Oak vs. Polished Terrazzo Concrete; Honed Carrara Marble vs. Matte Nero Marquina Quartz).

5. **Raw Job-Site Framing Staging**
   - Projects 3D finished spaces over physical wooden studs or unfinished concrete shells on-site.

6. **Browser-Native 360° Client Web Viewers**
   - Zero software downloads or client installs. Homeowners and stakeholders inspect designs, drop feedback pins, and approve finish schedules.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 App Router (Turbopack)
- **UI Runtime**: React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom architectural blueprint themes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Geist Sans & Geist Mono
- **Deployment**: Edge-ready static & cloud-rendered on Vercel / Cloudflare

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

© 2026 SiteSketch Technologies, Inc. All rights reserved.
