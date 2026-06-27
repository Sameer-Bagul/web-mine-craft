# Minecraft Next.js Implementation Tasks

## Phase 1: Foundation & R3F Migration (Frontend Only)
- [x] Scaffold Next.js + Tailwind project.
- [x] Install 3D and physics dependencies (`three`, R3F, Rapier).
- [x] Create base `Game` component with R3F Canvas and simple physics plane.
- [x] Setup dynamic import in `page.tsx` to prevent SSR errors.
- [x] Implement voxel/terrain chunk generation using `simplex-noise`.
- [x] Render terrain efficiently using `InstancedMesh`.
- [x] Implement player movement and block interaction logic.
- [x] Build basic UI (hotbar, health, crosshair).

## Phase 2: Game State & Generation Optimization
- [x] Setup Zustand for player state and inventory.
- [x] Implement sliding window chunk loading/unloading (infinite generation).
- [x] Move heavy terrain calculation to Web Workers.

## Phase 3: Backend, Database, & User Accounts
- [x] Create Landing Page (`/`) and remap Game to (`/play`).
- [ ] Build Authentication UI (Login / Register pages).
- [ ] Setup MongoDB Atlas with Mongoose.
- [ ] Implement JWT-based Authentication in Next.js API Routes.
- [ ] Create API routes to save/load modified chunks to MongoDB.

## Phase 4: Multiplayer Capabilities
- [ ] Setup Colyseus multiplayer room.
- [ ] Sync player positions and states.
- [ ] Handle world block updates globally via WebSockets.

## Phase 5: "Better Than Minecraft" Features
- [ ] Advanced graphics (Volumetric lighting/clouds, PBR textures).
- [ ] Infinite verticality and smooth terrain algorithms.
- [ ] Vehicles, logic blocks, and deep gameplay systems.
- [ ] Proximity Voice Chat (WebRTC) and MMO scaling.
