export function fetchAsBase64(url) {
	return fetch(url)
		.then(res => res.blob())
		.then(blob => new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result.split(",")[1]);
			};
			reader.readAsDataURL(blob);
		}));
}
