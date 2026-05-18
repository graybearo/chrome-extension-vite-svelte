<script lang="ts">
	import { onMount } from "svelte";
	import { createClient } from "mv3-message-router";
	import type { Messages } from "@/shared/messages";

	const client = createClient<Messages>();
	let count: number | null = null;
	let busy = false;

	onMount(async () => {
		const state = await client.send("GET_STATE", undefined);
		count = state.count;
	});

	async function inc(by: number) {
		busy = true;
		try {
			const { count: next } = await client.send("INCREMENT", { by });
			count = next;
		} finally {
			busy = false;
		}
	}
</script>

<main>
	<h1>MV3 Vite Svelte Starter</h1>
	<p class="count">{count ?? "…"}</p>
	<div class="row">
		<button type="button" on:click={() => inc(-1)} disabled={busy}>−</button>
		<button type="button" on:click={() => inc(1)} disabled={busy}>+</button>
	</div>
	<p class="hint">Edit <code>src/popup/App.svelte</code> — Vite hot-reloads it.</p>
</main>
