import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
	cartItems = []; // [product: {...}, count: N]

	constructor(cartIcon) {
		this.cartIcon = cartIcon;

		this.addEventListeners();
	}

	addProduct(product) {
		// ваш код

		if ((this.cartItems.some(item => item.product.id == product.id))) {

			this.cartItems.some((item) => {
				if (item.product.id == product.id) {
					item.count++;
					console.log(item);
				}
			});

		} else {
			this.cartItems.push({ product, count: 1 });
			console.log(this.cartItems);
		}

		this.onProductUpdate(this.cartItem);
	}

	updateProductCount(productId, amount) {
		// ваш код
		console.log(productId, amount);

		if (!this.isEmpty(this.cartItems)) {
			this.cartItems.some((item, i) => {

				if (item.product.id == productId) {

					if (amount == 1) {
						item.count++;
						// this.getTotalCount();
						console.log(item, i, "== индекс");
					} else {
						item.count--;
						console.log(item, i, "== индекс");
						// this.getTotalCount();
					}

					if (item.count == 0) {
						// console.log("kfjekeowekg")
						this.cartItems.splice(i, 1);
						console.log(this.cartItems);
					}
				}
			});
		}

		this.onProductUpdate(this.cartItem);
	}

	isEmpty() {
		// ваш код
		for (let key in this.cartItems) {
			return false;
		}
		return true;
	}

	getTotalCount() {
		// ваш код
		let sum = 0;

		if (!this.isEmpty()) {
			this.cartItems.forEach(item => {
				sum += item.count;

			});

			console.log("количество", sum);
		}

		return sum;
	}

	getTotalPrice() {
		// ваш код
		let sum = 0;

		if (!this.isEmpty()) {
			this.cartItems.forEach(item => {
				sum += item.product.price * item.count;
				// console.log("item = ", item.count)

			});
			console.log("сумма", sum);
		}

		return sum;
	}

	renderProduct(product, count) {
		return createElement(`
			<div class="cart-product" data-product-id="${product.id}">
				<div class="cart-product__img">
					<img src="/assets/images/products/${product.image}" alt="product">
				</div>
				<div class="cart-product__info">
					<div class="cart-product__title">${product.name}</div>
					<div class="cart-product__price-wrap">
					<div class="cart-counter">
						<button type="button" class="cart-counter__button cart-counter__button_minus">
						<img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
						</button>
						<span class="cart-counter__count">${count}</span>
						<button type="button" class="cart-counter__button cart-counter__button_plus">
						<img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
						</button>
					</div>
					<div class="cart-product__price">€${product.price.toFixed(2)}</div>
					</div>
				</div>
			</div>`);
	}

	renderOrderForm() {
		return createElement(`<form class="cart-form">
				<h5 class="cart-form__title">Delivery</h5>
				<div class="cart-form__group cart-form__group_row">
					<input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
					<input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
					<input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
				</div>
				<div class="cart-form__group">
					<input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
				</div>
				<div class="cart-buttons">
					<div class="cart-buttons__buttons btn-group">
					<div class="cart-buttons__info">
						<span class="cart-buttons__info-text">total</span>
						<span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
					</div>
					<button type="submit" class="cart-buttons__button btn-group__button button">order</button>
					</div>
				</div>
			</form>`);
	}

	renderModal() {
		// ...ваш код
		// let [product] = this.cartItems;
		// console.log("product", product)
		// console.log("this.cartItems", this.cartItems)

		let a = this.cartItems.forEach(item => {
			return item.product;
		})

		// console.log("a", a)
		// console.log(this.renderProduct(this.cartItems[0].product, this.cartItems[0].count))

		let template = createElement(`<div>Hello</div>`);
		for (let prop of this.cartItems) {
			template.insertAdjacentElement("beforeend", this.renderProduct(prop.product, prop.count))
		}

		console.log(template)

		let modal = new Modal();
		modal.setTitle("Your order");


		modal.setBody(template)

		// modal.setBody(this.cartItems.forEach(item => {
		// 	this.renderProduct(item.product, item.product.count);
		// }));

		modal.open()
	}

	onProductUpdate(cartItem) {
		// ...ваш код

		this.cartIcon.update(this);
	}

	onSubmit(event) {
		// ...ваш код
	};

	addEventListeners() {
		this.cartIcon.elem.onclick = () => this.renderModal();
	}
}
