import App from "./App.svelte";
import "./app.css";

const target = document.getElementById("root");
if (!target) throw new Error("missing #root");

new App({ target });
