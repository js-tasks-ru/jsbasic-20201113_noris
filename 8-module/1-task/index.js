import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
	constructor() {
		this.render();

		this.addEventListeners();
	}

	render() {
		this.elem = createElement('<div class="cart-icon"></div>');
		this.container = document.querySelector(".container")
	}

	update(cart) {
		if (!cart.isEmpty()) {
			this.elem.classList.add('cart-icon_visible');

			this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice()}</span>
        </div>`;

			this.updatePosition();

			this.elem.classList.add('shake');
			this.elem.addEventListener('transitionend', () => {
				this.elem.classList.remove('shake');
			}, { once: true });

		} else {
			this.elem.classList.remove('cart-icon_visible');
		}
	}

	addEventListeners() {
		document.addEventListener('scroll', () => this.updatePosition());
		window.addEventListener('resize', () => this.updatePosition());
	}

	updatePosition() {
		// ваш код ...
		let left = Math.min(this.container.getBoundingClientRect().right + 20, document.documentElement.clientWidth - this.elem.offsetWidth - 10)

		if (window.pageYOffset > 50 && this.elem.offsetWidth > 0 && window.innerWidth > 767) {
			Object.assign(this.elem.style, {
				position: "fixed",
				top: "50px",
				left: left + "px",
				right: "10px",
				"z-index": "1000"
			})
		} else if (window.pageYOffset < 51 || window.innerWidth <= 767) {
			this.elem.style = ""
		}
	}
}
