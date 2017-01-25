import html from "./page.html";
import { navigate } from "../app";

export function open() {
	document.body.innerHTML = html;
	document.querySelector(".nav-dashboard").addEventListener("click", () => {
		navigate("dashboard");
	});
	document.querySelector(".nav-admin").addEventListener("click", () => {
		navigate("admin");
	});
	return Promise.resolve();
}

export function close() {
	return Promise.resolve();
}
