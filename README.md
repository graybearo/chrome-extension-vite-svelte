# chrome-extension-vite-svelte

> A Chrome extension boilerplate for **Manifest V3 (MV3)** — Vite + Svelte +
> TypeScript, with hot-module reload for popup / options / content scripts,
> typed message passing, and a service-worker keepalive baked in. Works in
> Chrome, Edge, and Firefox out of the box.

<p>
  <img src="https://img.shields.io/badge/manifest-v3-blue" alt="MV3">
  <img src="https://img.shields.io/badge/vite-5-purple" alt="Vite 5">
  <img src="https://img.shields.io/badge/svelte-4-ff3e00" alt="Svelte 4">
  <img src="https://img.shields.io/badge/typescript-5-3178c6" alt="TS 5">
</p>

A modern, opinionated starter for building **Chrome extensions** (and Edge /
Firefox / browser extensions in general) on **Manifest V3**, with the small
bundle size and ergonomics of Svelte.

## What's in the box

- ⚡ **Vite 5 + `@crxjs/vite-plugin`** — manifest is the source of truth; HMR
  works in popup, options, and content scripts.
- 🟧 **Svelte 4 + TypeScript (strict)** — popup + options are real Svelte
  apps with `<script lang="ts">`.
- 📡 **Typed messaging** via [`mv3-message-router`](https://github.com/graybearo/mv3-message-router)
  — declare a `Messages` interface once, get end-to-end typing in the SW,
  popup, and content scripts.
- ⏰ **Durable scheduling** via [`mv3-keepalive`](https://github.com/graybearo/mv3-keepalive)
  — `chrome.alarms` that survive SW termination, plus a keepalive helper for
  long async work.
- 🦊 **Cross-browser** — `pnpm build` for Chrome / Edge, `pnpm build:firefox`
  for Firefox (background runs as a script, not a service worker).
- 📦 **`pnpm zip`** — packs `dist/` into a ready-to-upload `.zip`.

## Quick start

```bash
git clone https://github.com/graybearo/chrome-extension-vite-svelte my-extension
cd my-extension
pnpm install
pnpm dev
```

Then in Chrome:

1. Open `chrome://extensions/`
2. Toggle **Developer mode** on
3. Click **Load unpacked**
4. Select the `dist/` folder

The popup, options page, and content script all hot-reload as you edit them.

## Layout

```
src/
├── background/index.ts     # service worker — router + alarms live here
├── content/index.ts        # injected into every https:// page
├── popup/                  # Svelte popup (action.default_popup)
├── options/                # Svelte options page
└── shared/
    ├── messages.ts         # typed message contract (single source of truth)
    └── storage.ts          # thin chrome.storage wrapper
```

## How messaging works

Declare your messages once:

```ts
// src/shared/messages.ts
export interface Messages {
  GET_STATE: { input: void; output: { count: number } };
  INCREMENT: { input: { by: number }; output: { count: number } };
}
```

Register handlers in the SW:

```ts
// src/background/index.ts
const router = createRouter<Messages>();
router.on("INCREMENT", async ({ by }) => { /* ... */ });
router.listen();
```

Call from popup / content / options:

```ts
const client = createClient<Messages>();
const { count } = await client.send("INCREMENT", { by: 1 });
//      ^? number
```

## Building

```bash
pnpm build           # Chrome / Edge build into dist/
pnpm build:firefox   # Firefox-flavored build (background as script)
pnpm zip             # zip dist/ for web-store upload
```

## Related packages

Part of a small **MV3 toolkit** by [@graybearo](https://github.com/graybearo):

- [`mv3-keepalive`](https://github.com/graybearo/mv3-keepalive) — service-worker keepalive + durable alarms
- [`mv3-message-router`](https://github.com/graybearo/mv3-message-router) — type-safe message passing
- [`chrome-extension-vite-react`](https://github.com/graybearo/chrome-extension-vite-react) — React version of this starter
- [`chrome-extension-webpack-react`](https://github.com/graybearo/chrome-extension-webpack-react) — webpack + React starter
- [`awesome-mv3`](https://github.com/graybearo/awesome-mv3) — curated list of MV3 tools, libraries, and resources

## License

MIT — see [LICENSE](LICENSE).
