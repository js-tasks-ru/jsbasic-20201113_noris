export default class StepSlider {
	constructor({ steps, value = 0 }) {
		console.log(this)
		this.elem = this.render();
		this.value = value;
		this.steps = steps;

	}

	render() {
		let elem = document.createElement("div");
		elem.className = "slider";
		console.log(this)
		let template = `
			<div class="slider__thumb">
				<span class="slider__value">${this.value}</span>
			</div>

			<div class="slider__progress"></div>

			<div class="slider__steps"></div>`;

		elem.insertAdjacentHTML("beforeend", template)

		return elem;
	}
}
