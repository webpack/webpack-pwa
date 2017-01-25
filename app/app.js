"use strict";

import offlineRuntime from "offline-plugin/runtime";

let currentPage;
let currentAction;

document.body.style.background = "lightblue";

export function bootstrap(page) {
	currentPage = page;
	currentAction = currentPage.open()
		.then(() => {
			offlineRuntime.install();
		});
	registerRouter();
}

export function bootstrapAsync(pageName) {
	currentAction = Promise.resolve();
	openPage({
		page: pageName
	}).then(() => {
		offlineRuntime.install();
	});
	registerRouter();
}

function registerRouter() {
	window.addEventListener("popstate", event => {
		openPage(event.state || {
			page: location.pathname.replace(/^\/|\.html$/g, "")
		});
	});
}

//const loadingPage = import("./loading/page");

function openPage(state) {
	const pageName = state.page;
	currentAction = currentAction
		.then(() => currentPage && currentPage.close())
		.then(() => import(`./${pageName}/page`))
		/*.then(() => loadingPage
			.then(loading => loading.open(pageName)
				.then(() => import(`./${pageName}/page`))
				.then(page => loading.close().then(() => page))
		))*/
		.then(newPage => {
			currentPage = newPage;
			return currentPage.open();
		})
		.catch(err => {
			return import("./error/page")
				.then(newPage => {
					currentPage = newPage;
					return currentPage.open(err);
				});
		});
	return currentAction;
}

export function navigate(pageName) {
	const state = { page: pageName };
	window.history.pushState(state, pageName, `${pageName}.html`);
	openPage(state);
}
