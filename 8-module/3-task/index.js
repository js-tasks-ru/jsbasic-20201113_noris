/ eslint-disable indent /
export default class Cart {
	cartItems = []; // [product: {...}, count: N]

	constructor(cartIcon) {
		this.cartIcon = cartIcon;
	}

	addProduct(product) {
		// ваш код

		if ((this.cartItems.some(item => item.product.id == product.id))) {

			this.cartItems.some((item) => {
				if (item.product.id == product.id) {
					item.count++;
					// console.log(item);
				}
			});

		} else {
			this.cartItems.push({ product, count: 1 });
			// console.log(this.cartItems);
		}

		this.onProductUpdate(this.cartItem);
	}

	updateProductCount(productId, amount) {
		// ваш код
		// console.log(productId, amount);

		if (!this.isEmpty(this.cartItems)) {
			this.cartItems.some((item, i) => {

				if (item.product.id == productId) {

					if (amount == 1) {
						item.count++;
						// this.getTotalCount();
						// console.log(item, i, "== индекс");
					} else {
						item.count--;
						// console.log(item, i, "== индекс");
						// this.getTotalCount();
					}

					if (item.count == 0) {
						// console.log("kfjekeowekg")
						this.cartItems.splice(i, 1);
						// console.log(this.cartItems);
					}
				}
			});
		}

		this.onProductUpdate(this.cartItems);
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

			// console.log("количество", sum);
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
			// console.log("сумма", sum);
		}

		return sum;
	}

	onProductUpdate(cartItem) {
		// реализуем в следующей задаче

		this.cartIcon.update(this);
	}


}