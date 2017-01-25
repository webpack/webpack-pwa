export function open(name) {
	document.body.innerHTML = "<h1></h1>";
	document.querySelector("h1").innerText = `Loading ${name}...`;
	return Promise.resolve();
}

export function close() {
	return Promise.resolve();
}