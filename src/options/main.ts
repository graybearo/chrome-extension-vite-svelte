import App from "./App.svelte";

const target = document.getElementById("root");
if (!target) throw new Error("missing #root");

new App({ target });
