import html from "./page.html";
import { fetchAsBase64 } from "../utils/fetch";
import { navigate } from "../app";

export function open() {
	document.body.innerHTML = html;
	document.querySelector(".nav-admin").addEventListener("click", () => {
		navigate("admin");
	});
	document.querySelector(".nav-login").addEventListener("click", () => {
		navigate("login");
	});
	document.querySelector(".nav-unknown").addEventListener("click", () => {
		navigate("unknown");
	});
	const lastResult = localStorage.random;
	if(lastResult)
		document.querySelector(".content").innerText = `${lastResult} (updating...)`;
	return fetchAsBase64("https://httpbin.org/bytes/10").then(res => {
		document.querySelector(".content").innerText = localStorage.random = res;
	}).catch(err => {
		if(lastResult)
			document.querySelector(".content").innerText = `${lastResult} (Sorry you are offline, this was the last result)`;
		else
			document.querySelector(".content").innerText = "Sorry you are offline.";
	});
}

export function close() {
	return Promise.resolve();
}