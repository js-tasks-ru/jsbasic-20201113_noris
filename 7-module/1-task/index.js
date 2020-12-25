import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
	constructor(categories) {
		this.categories = categories;
		this.elem = this.render();
	}

	render() {
		let ribbon = createElement("<div class='ribbon'></div>");
		this.buttonLeft = createElement(`
			<button class="ribbon__arrow ribbon__arrow_left">
      			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
			</button>`);
		this.buttonRight = createElement(`
			<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
			</button>`);

		this.inner = createElement("<nav class='ribbon__inner'></nav>")

		for (let prop of this.categories) {
			let template = `
				<a href="#" class="ribbon__item " data-id="${prop.id}">${prop.name}</a>`;

			this.inner.insertAdjacentHTML("beforeend", template);
		}

		ribbon.prepend(this.buttonLeft);
		ribbon.append(this.inner);
		ribbon.append(this.buttonRight);

		ribbon.addEventListener("click", this.onClick);


		return ribbon;
	}

	onClick = event => {
		let scrollWidth = this.inner.scrollWidth;
		let scrollLeft = this.inner.scrollLeft;
		let clientWidth = this.inner.clientWidth;
		let scrollRight = scrollWidth - scrollLeft - clientWidth;
		let eventCustom = new CustomEvent('ribbon-select', {
			detail: event.target.dataset.id,
			bubbles: true
		})
		let ribbonItems = this.inner.querySelectorAll(".ribbon__item");

		if (event.target.classList.contains("ribbon__item")) {

			event.preventDefault();
			for (let prop of ribbonItems) {
				prop.classList.remove("ribbon__item_active");
			}
			event.target.classList.add("ribbon__item_active");
			this.elem.dispatchEvent(eventCustom);
		}

		if (event.target.classList.contains("ribbon__arrow_left")) {
			this.inner.scrollBy(-350, 0);
			this.buttonRight.classList.add("ribbon__arrow_visible");

			if (this.inner.scrollLeft < 351) {
				this.buttonLeft.classList.remove("ribbon__arrow_visible");
			}
		}
		if (event.target.classList.contains("ribbon__arrow_right")) {
			this.inner.scrollBy(350, 0);
			this.buttonLeft.classList.add("ribbon__arrow_visible");
			if (scrollRight < 190) {
				this.buttonRight.classList.remove("ribbon__arrow_visible");
			}
		}
	}
}
