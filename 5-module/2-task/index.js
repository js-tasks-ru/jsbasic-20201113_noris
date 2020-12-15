function toggleText() {
	// ваш код...
	let text = document.querySelector("#text");
	let button = document.querySelector(".toggle-text-button");

	button.onclick = function () {

		if (text.hidden) {
			text.hidden = false;
		} else {
			text.hidden = true;
		}
	};
}
