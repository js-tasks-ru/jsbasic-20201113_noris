import createElement from '../../assets/lib/create-element.js';

// export default class StepSlider {
// 	constructor({ steps, value = 0 }) {
// 		this.config = { steps, value };
// 		this.step = this.config.steps;
// 		this.value = this.config.value;
// 		this.elem = this.render();
// 	}

// 	render() {
// 		let elem = document.createElement("div");
// 		elem.className = "slider";

// 		let template = `
// 			<div class="slider__thumb">
// 				<span class="slider__value">${this.value}</span>
// 			</div>

// 			<div class="slider__progress"></div>

// 			<div class="slider__steps"></div>`;

// 		elem.insertAdjacentHTML("beforeend", template)

// 		let sliderSteps = elem.querySelector(".slider__steps");
// 		this.thumb = elem.querySelector(".slider__thumb");
// 		this.progress = elem.querySelector('.slider__progress');

// 		this.thumb.style.left = `${this.value}%`;
// 		this.progress.style.width = `${this.value}%`;

// 		for (let i = 0; i < this.step; i++) {
// 			let templateSpan = `<span data-index="${i}"></span>`;
// 			sliderSteps.insertAdjacentHTML("beforeend", templateSpan);
// 		}

// 		this.spanItem = elem.querySelectorAll(".slider__steps span");
// 		this.spanItem[0].classList.add("slider__step-active");

// 		// this.thumb.style.left = `75%`;
// 		// this.progress.style.width = `75%`;

// 		elem.addEventListener("click", this.onClick);

// 		this.thumb.addEventListener("pointerdown", this.sliderMouse);

// 		this.thumb.ondragstart = function () {
// 			return false;
// 		};

// 		return elem;
// 	}

// 	onClick = e => {
// 		let valueSpan = this.elem.querySelector(".slider__value");
// 		let left = e.clientX - this.elem.getBoundingClientRect().left;
// 		let leftRelative = left / this.elem.offsetWidth;
// 		let segments = this.step - 1;
// 		let approximateValue = leftRelative * segments;
// 		let value = Math.round(approximateValue);
// 		let valuePercents = value / segments * 100;

// 		if (e.target.closest(".slider")) {

// 			this.thumb.style.left = `${valuePercents}%`;
// 			this.progress.style.width = `${valuePercents}%`;

// 			for (let prop of this.spanItem) {
// 				prop.classList.remove("slider__step-active");
// 			}

// 			this.spanItem[value].classList.add("slider__step-active");
// 			valueSpan.innerHTML = this.spanItem[value].dataset.index;

// 			let event = new CustomEvent('slider-change', {
// 				detail: value,
// 				bubbles: true
// 			})

// 			this.elem.dispatchEvent(event);
// 		}
// 	}

// 	sliderMouse = event => {
// 		let slider = document.querySelector(".slider");
// 		let thumb = slider.querySelector(".slider__thumb");
// 		let progress = slider.querySelector('.slider__progress');
// 		let segments = this.step - 1;
// 		let currentDroppable = null;
// 		let valueSpan = this.elem.querySelector(".slider__value");
// 		let spanItem = slider.querySelectorAll(".slider__steps span");
// 		slider.classList.add("slider_dragging");

// 		event.preventDefault();

// 		document.addEventListener('pointermove', onMouseMove);
// 		document.addEventListener('pointerup', onMouseUp);

// 		function onMouseMove(event) {
// 			let left = event.clientX - slider.getBoundingClientRect().left;
// 			let leftRelative = left / slider.offsetWidth;
// 			let approximateValue = leftRelative * segments;
// 			let value = Math.round(approximateValue);

// 			if (leftRelative < 0) {
// 				leftRelative = 0;
// 			}

// 			if (leftRelative > 1) {
// 				leftRelative = 1;
// 			}

// 			let leftPercents = leftRelative * 100;

// 			thumb.style.left = `${leftPercents}%`;
// 			progress.style.width = `${leftPercents}%`;

// 			thumb.hidden = true;
// 			let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// 			thumb.hidden = false;

// 			if (!elemBelow) return;

// 			let droppableBelow = elemBelow.closest('.slider__steps span');

// 			if (currentDroppable != droppableBelow) {

// 				if (currentDroppable) {
// 					// document.body.style.background = "black";
// 				}

// 				currentDroppable = droppableBelow;

// 				if (currentDroppable) {
// 					valueSpan.innerHTML = spanItem[value].dataset.index;
// 					// document.body.style.background = "green";
// 				}
// 			}

// 			let eventMove = new CustomEvent('slider-change', {
// 				detail: value,
// 				bubbles: true
// 			})

// 			slider.dispatchEvent(eventMove);
// 		}

// 		function onMouseUp() {
// 			document.removeEventListener('pointerup', onMouseUp);
// 			document.removeEventListener('pointermove', onMouseMove);
// 			slider.classList.remove("slider_dragging");
// 		}


// 		this.thumb.ondragstart = function () {
// 			return false;
// 		};
// 	}
// }

export default class StepSlider {
	constructor({ steps, value = 0 }) {
		this.steps = steps;
		this.segments = steps - 1;
		this.render();

		this.addEventListeners();

		this.setValue(value);
	}

	render() {
		this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
	}

	setValue(value) {
		this.value = value;

		let valuePercents = (value / this.segments) * 100;

		this.sub('thumb').style.left = `${valuePercents}%`;
		this.sub('progress').style.width = `${valuePercents}%`;

		this.sub('value').innerHTML = value;

		if (this.sub('step-active')) {
			this.sub('step-active').classList.remove('slider__step-active');
		}

		this.sub('steps').children[this.value].classList.add('slider__step-active');
	}

	addEventListeners() {
		this.sub('thumb').ondragstart = () => false;

		this.sub('thumb').onpointerdown = this.onPointerDown;

		this.elem.onclick = this.onClick;
	}

	onClick = event => {
		let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

		this.setValue(Math.round(this.segments * newLeft));

		this.elem.dispatchEvent(
			new CustomEvent('slider-change', {
				detail: this.value,
				bubbles: true
			})
		);
	}

	onPointerDown = event => {
		event.preventDefault();

		this.elem.classList.add('slider_dragging');

		document.addEventListener('pointermove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp);
	}

	onPointerMove = event => {
		event.preventDefault();

		let newLeft = this.calcLeftByEvent(event);

		this.sub('thumb').style.left = `${newLeft * 100}%`;
		this.sub('progress').style.width = `${newLeft * 100}%`;

		// Show the nearest value
		// First half of step is 1, et
		// |-------|-------|-------|-------|
		// | 1 /   2   /   3   /   4   / 5 |
		this.value = Math.round(this.segments * newLeft);
		this.sub('value').innerHTML = this.value;

		if (this.sub('step-active')) {
			this.sub('step-active').classList.remove('slider__step-active');
		}

		this.sub('steps').children[this.value].classList.add('slider__step-active');
	};

	calcLeftByEvent(event) {
		let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

		if (newLeft < 0) { newLeft = 0; }
		if (newLeft > 1) { newLeft = 1; }

		return newLeft;
	}

	onPointerUp = () => {
		document.removeEventListener('pointermove', this.onPointerMove);
		document.removeEventListener('pointerup', this.onPointerUp);

		this.elem.classList.remove('slider_dragging');

		// stick to the final value
		this.sub('thumb').style.left = `${(this.value / this.segments) * 100}%`;
		this.sub('progress').style.width = `${(this.value / this.segments) * 100}%`;

		this.elem.dispatchEvent(
			new CustomEvent('slider-change', {
				detail: this.value,
				bubbles: true
			})
		);
	};

	sub(ref) {
		return this.elem.querySelector(`.slider__${ref}`);
	}

}