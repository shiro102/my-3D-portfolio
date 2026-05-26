# 3D Portfolio Performance Suggestions

Performance notes for the Work Room 3D section (`WorkRoom3D`, `MyRoom`, nested UI). Ordered by impact.

---

## What’s costing the most

### 1. Nested WebGL inside the laptop screen (critical)

`Works` is mounted inside drei `<Html transform>` on the 3D laptop screen. Each project tab can mount `AnimatedButton`, which creates **its own `<Canvas>`** with a `useFrame` loop that updates geometry every frame (`src/components/3D/components/AnimatedButton.tsx`).

In 3D mode you can end up with **1 main Canvas + up to 3 nested Canvases** (after scroll), each with lights and per-frame vertex updates.

**Fix:** In `is3D` mode, never use nested `<Canvas>`. Use CSS gradients, a single shared 2D canvas, or a static image/SVG for tab backgrounds.

**Status:** Implemented — `Work.tsx` uses static CSS backgrounds when `is3D`.

---

### 2. Large React DOM synced to 3D (`<Html transform>`)

The laptop screen embeds full `Navbar` + `Works` (carousel, GSAP, images, tabs) in `MyRoom.tsx`. `transform` Html reprojects DOM every frame while orbiting — one of the most expensive R3F patterns.

**Fix:**

- Mount this overlay **only after** `finishedCameraAnimating` (lazy mount).
- Better long-term: put Works in a **fixed HTML overlay** aligned to the screen (CSS), keep the 3D scene mesh-only.
- Set `distanceFactor`, `zIndexRange`, and avoid `occlude="blending"` unless needed (blending occlusion is costly).

You also have **7+ `<Html>`** blocks (certificates, photos, floating laptop button) with external Google Drive images.

**Status:** Implemented — lightweight skeleton `Html` shows while `isCameraAnimating`; full `Works`/`Navbar` mount when `finishedCameraAnimating` is true (after both camera tween segments complete).

---

### 3. Shadows on ~80 meshes + two shadow-casting lights

- ~**80** `<mesh>` nodes in `MyRoom.tsx`
- Almost all use `castShadow` / `receiveShadow`
- GSAP also enables shadows on **every** mesh via `traverse`
- `WorkRoom3D`: `shadows` on Canvas, `LightHelper` has two `castShadow` lights (1024² and **2048²**), plus `ContactShadows`

**Fix:**

- Turn off mesh shadows; use **only** `ContactShadows` (or one 1024 shadow light on the floor).
- Set `castShadow={false}` on small props (cups, plants, frames).
- Remove the `traverse` that forces shadows on everything.

---

### 4. Continuous animation loops

| Source | Cost |
|--------|------|
| `SteamRibbon` | 15 `meshStandardMaterial` planes, updated every frame |
| `MyRoom` `useFrame` | `lookAt(camera)` every frame |
| `OrbitControls` | Main loop always running |
| GLB cup animation | Replays on a timer |

**Fix:**

- `frameloop="demand"` on main `Canvas` + `invalidate()` on drag/zoom/animation. **(implemented)**
- Pause `SteamRibbon` when off-screen or on mobile. **(implemented)**
- Run `lookAt` only when the camera moves, not every frame.
- Pause steam + cup animation when cup leaves camera frustum; lazy-mount wall picture `<Html>` when wall decor is in view. **(implemented)**

---

### 5. Dev tooling and debug code in production

- **Leva** panel always rendered in `WorkRoom3D`
- **BoxHelper** left in `MyRoom` (`useEffect` adding red box helper)

**Fix:** Gate Leva and helpers behind `process.env.NODE_ENV === 'development'`.

---

### 6. Canvas defaults (retina + full viewport)

Full viewport height with no `dpr` cap → Retina often renders at **2×** pixel density.

**Fix:**

```tsx
<Canvas
  dpr={[1, 1.5]} // or 1 on mobile
  gl={{ antialias: false, powerPreference: 'high-performance' }}
/>
```

---

## Medium-impact improvements

### 7. Reduce draw calls in the GLB

~80 draw calls from separate meshes. In Blender or gltf-transform:

- Merge static meshes by material
- Resize/compress textures (512–1024 max)
- Remove hidden geometry
- Keep Draco (`useGLTF(url, true)` is already used)

`public/models/isometric_room_fin_3.glb` is ~1.6 MB — mesh count often matters more than file size for FPS.

### 8. Lazy-load the 3D section

The `#work` section does not need WebGL on first paint.

- `dynamic(() => import('...'), { ssr: false })` for `WorkRoom3D`
- `IntersectionObserver` to mount `<Canvas>` when `#work` enters the viewport

### 9. Quality tiers (mobile / low-end)

```ts
const isLowEnd = window.innerWidth < 768 || navigator.hardwareConcurrency <= 4;
```

On low-end: no shadows, no steam, no heavy Html tooltips, `dpr={1}`, simpler materials.

### 10. Images in 3D overlays

Certificate/photo frames load from Google Drive inside `<Html>`. Host optimized assets in `/public` (WebP, fixed sizes).

---

## Priority order

| Priority | Change | Expected gain |
|----------|--------|----------------|
| P0 | Remove nested `<Canvas>` in `AnimatedButton` when `is3D` | Large |
| P0 | Lazy-mount or move `Works` out of `Html transform` | Large |
| P1 | Cut shadow casters / use ContactShadows only | Large |
| P1 | `dpr` cap + `frameloop="demand"` | Medium–large |
| P2 | Remove Leva + BoxHelper in prod | Medium |
| P2 | Pause steam / reduce `useFrame` work | Medium |
| P3 | Merge GLB meshes, lazy-load section | Medium |

---

## Quick wins (not yet implemented)

1. In `Work.tsx`, when `is3D`, use static tab backgrounds (done).
2. Wrap laptop `<Html>` content in `{finishedCameraAnimating && (...)}` (done).
3. Remove the `BoxHelper` `useEffect` in `MyRoom.tsx`.
4. Add `dpr={[1, 1.5]}` to `<Canvas>` in `WorkRoom3D.tsx`.
5. Set `shadows={false}` and keep only `ContactShadows`, or disable both on mobile.

---

## How to verify

**Chrome DevTools → Performance** (record while orbiting):

- GPU and Scripting spikes during Html + nested canvas use
- Rendering with many shadow map passes

**React DevTools:** Confirm only **one** `<Canvas>` exists after interacting with the laptop UI.

---

## Related files

| File | Role |
|------|------|
| `src/components/react/sections/WorkRoom3D.tsx` | Main Canvas, lights, Leva |
| `src/components/3D/components/MyRoom.tsx` | GLB room, Html overlays |
| `src/components/react/sections/Work.tsx` | Works UI, tab buttons |
| `src/components/3D/components/AnimatedButton.tsx` | Nested Canvas wave buttons |
| `src/components/3D/helpers/LightHelper.tsx` | Shadow-casting lights |
| `public/models/isometric_room_fin_3.glb` | Main room model |
