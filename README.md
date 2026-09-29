# Vlad Crasnojon — Portfolio

Junior AI / Full-Stack Engineer portfolio. Static Next.js site showcasing production platforms (AILIN, ABC MATE) and AI/systems projects.

## Stack

Next.js 16 · React 19 · TailwindCSS 4 · Motion · lucide-react · TypeScript

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & preview

```bash
npm run build
./launch.sh
```

`launch.sh` builds the static export and serves `out/` on http://localhost:4173.

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`: `npm ci` + `npm run build`, publishes `out/` to the `gh-pages` branch. Enable Pages from the `gh-pages` branch in repo settings.

## Project photos

Featured project screenshots live in `public/assets/projects/`:

```
ailin-1.png · ailin-2.png · ailin-3.png
abcmate-1.png · abcmate-2.png · abcmate-3.png
```

Wired via `image` + `galleryImages` in `data/portfolioData.ts`. Cards fall back to a branded placeholder when no image is set.
