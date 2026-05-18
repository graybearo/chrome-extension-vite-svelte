import { defineManifest } from "@crxjs/vite-plugin";

const isFirefox = process.env.BROWSER === "firefox";

export default defineManifest({
	manifest_version: 3,
	name: "Chrome Extension Vite Svelte Starter",
	version: "0.0.1",
	description: "Starter MV3 extension — Vite + Svelte + TypeScript with typed messaging and SW keepalive.",
	action: {
		default_popup: "src/popup/index.html",
		default_title: "Vite Svelte Starter",
	},
	options_page: "src/options/index.html",
	background: isFirefox
		? { scripts: ["src/background/index.ts"], type: "module" }
		: { service_worker: "src/background/index.ts", type: "module" },
	content_scripts: [
		{
			matches: ["https://*/*"],
			js: ["src/content/index.ts"],
			run_at: "document_idle",
		},
	],
	permissions: ["alarms", "storage"],
});
