export default class StepSlider {
	constructor({ steps, value = 0 }) {
		this.config = { steps, value };
		this.step = this.config.steps;
		this.value = this.config.value;
		this.elem = this.render();
	}

	render() {
		let elem = document.createElement("div");
		elem.className = "slider";

		let template = `
			<div class="slider__thumb">
				<span class="slider__value">${this.value}</span>
			</div>

			<div class="slider__progress"></div>

			<div class="slider__steps"></div>`;

		elem.insertAdjacentHTML("beforeend", template)

		let sliderSteps = elem.querySelector(".slider__steps");
		this.thumb = elem.querySelector(".slider__thumb");
		this.progress = elem.querySelector('.slider__progress');

		this.thumb.style.left = `${this.value}%`;
		this.progress.style.width = `${this.value}%`;

		for (let i = 0; i < this.step; i++) {
			let templateSpan = `<span data-index="${i}"></span>`;
			sliderSteps.insertAdjacentHTML("beforeend", templateSpan);
		}

		this.spanItem = elem.querySelectorAll(".slider__steps span");
		this.spanItem[0].classList.add("slider__step-active");

		elem.addEventListener("click", this.onClick);

		return elem;
	}

	onClick = e => {
		let valueSpan = this.elem.querySelector(".slider__value");
		let left = e.clientX - this.elem.getBoundingClientRect().left;
		let leftRelative = left / this.elem.offsetWidth;
		let segments = this.step - 1;
		let approximateValue = leftRelative * segments;
		let value = Math.round(approximateValue);
		let valuePercents = value / segments * 100;

		if(e.target.closest(".slider")) {

			this.thumb.style.left = `${valuePercents}%`;
			this.progress.style.width = `${valuePercents}%`;

			for( let prop of this.spanItem){
				prop.classList.remove("slider__step-active");
			}

			this.spanItem[value].classList.add("slider__step-active");
			valueSpan.innerHTML = this.spanItem[value].dataset.index;

			let event = new CustomEvent('slider-change', {
				detail: value,
				bubbles: true
			})

			this.elem.dispatchEvent(event);
		}
	}
}
