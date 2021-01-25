import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

// export default class Main {

// 	constructor() {
// 	}

// 	async render() {
// 		// ... ваш код

// 		let main = document.querySelector("main");
// 		let checkboxNuts = main.querySelector("#nuts-checkbox");
// 		let checkboxVegeterian = main.querySelector("#vegeterian-checkbox");

// 		//Карусель
// 		let carouselSlides = new Carousel(slides);
// 		let carousel = main.querySelector("[data-carousel-holder]");
// 		carousel.insertAdjacentElement("beforeend", carouselSlides.elem);

// 		//Меню
// 		let ribbonMenu = new RibbonMenu(categories);
// 		let ribbon = main.querySelector("[data-ribbon-holder]");
// 		ribbon.insertAdjacentElement("beforeend", ribbonMenu.elem);


// 		//Слайдер
// 		let stepSlider = new StepSlider({ steps: 5 });
// 		let slider = main.querySelector("[data-slider-holder]");
// 		slider.insertAdjacentElement("beforeend", stepSlider.elem);

// 		//логотип корзины
// 		let cartIcon = new CartIcon();
// 		let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
// 		cartIconHolder.append(cartIcon.elem);

// 		this.cart = new Cart(cartIcon);

// 		await fetch("products.json")
// 			.then(response => response.json())
// 			.then(products => {
// 				console.log(products);
// 				this.productsGrid = new ProductsGrid(products);
// 				let productsHolder = main.querySelector("[data-products-grid-holder]");
// 				productsHolder.innerHTML = "";
// 				productsHolder.insertAdjacentElement("beforeend", this.productsGrid.elem);

// 				return products;
// 			})
// 			.then(products => {

// 				document.body.addEventListener("product-add", event => {
// 					let productToAdd = products.find((product) => product.id === event.detail);
// 					this.cart.addProduct(productToAdd)
// 					console.log(event.detail)
// 				})
// 			})
// 		// .then((products) => {
// 		// 	let productParent = document.querySelector(".products-grid");

// 		// 	productParent.addEventListener('click', (event) => {
// 		// 		let button = event.target.closest(".card__button");
// 		// 		// let addProductId = event.target.closest(".card__title");
// 		// 		let buttonCheck = event.path[2].querySelector(".card__title").textContent;

// 		// 		if (button) {
// 		// 			console.log(buttonCheck)

// 		// 			let productToAdd = products.find((product) => product.id.split("-").join(" ") === buttonCheck.toLowerCase());

// 		// 			console.log(productToAdd)

// 		// 			// if (productToAdd) {
// 		// 			// 	this.cart.addProduct(productToAdd);
// 		// 			// }
// 		// 		}
// 		// 	})
// 		// })

// 		checkboxNuts.addEventListener("change", () => {

// 			if (checkboxNuts.checked) {
// 				this.productsGrid.updateFilter({
// 					noNuts: checkboxNuts.checked
// 				});
// 			} else {
// 				this.productsGrid.updateFilter({
// 					noNuts: checkboxNuts.checked
// 				});
// 			}
// 		})

// 		checkboxVegeterian.addEventListener("change", () => {

// 			if (checkboxVegeterian.checked) {
// 				this.productsGrid.updateFilter({
// 					vegeterianOnly: checkboxVegeterian.checked
// 				});
// 			} else {
// 				this.productsGrid.updateFilter({
// 					vegeterianOnly: checkboxVegeterian.checked
// 				});
// 			}
// 		})

// 		document.body.addEventListener("slider-change", event => {
// 			this.productsGrid.updateFilter({
// 				maxSpiciness: event.detail
// 			})
// 		})

// 		document.body.addEventListener("ribbon-select", event => {
// 			this.productsGrid.updateFilter({
// 				category: event.detail
// 			})
// 		})
// 	}
// }

export default class Main {

	constructor() {
	}

	async render() {
		this.renderCarousel();
		this.renderRibbon();
		this.renderStepSlider();
		this.renderCartIcon()

		this.cart = new Cart(this.cartIcon);

		this.products = await this.fetchProducts();

		this.renderProductsGrid();

		this.productsGrid.updateFilter({
			noNuts: document.getElementById('nuts-checkbox').checked,
			vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
			maxSpiciness: this.stepSlider.value,
			category: this.ribbonMenu.value
		});

		document.body.addEventListener('product-add', ({ detail: productId }) => {
			let product = this.products.find(product => product.id == productId);
			this.cart.addProduct(product);
		});

		this.stepSlider.elem.addEventListener('slider-change', ({ detail: value }) => {
			this.productsGrid.updateFilter({
				maxSpiciness: value
			});
		});

		this.ribbonMenu.elem.addEventListener('ribbon-select', ({ detail: categoryId }) => {
			this.productsGrid.updateFilter({
				category: categoryId
			});
		});

		document.getElementById('nuts-checkbox').onchange = event => {
			this.productsGrid.updateFilter({
				noNuts: event.target.checked
			});
		};

		document.getElementById('vegeterian-checkbox').onchange = event => {
			this.productsGrid.updateFilter({
				vegeterianOnly: event.target.checked
			});
		};
	}

	renderCarousel() {
		this.carousel = new Carousel(slides);

		document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
	}

	renderRibbon() {
		this.ribbonMenu = new RibbonMenu(categories);

		document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
	}

	renderStepSlider() {
		this.stepSlider = new StepSlider({
			steps: 5,
			value: 3
		});

		document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
	}

	renderCartIcon() {
		let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
		this.cartIcon = new CartIcon();

		cartIconHolder.append(this.cartIcon.elem);
	}

	renderProductsGrid() {
		this.productsGrid = new ProductsGrid(this.products);
		document.querySelector('[data-products-grid-holder]').innerHTML = '';
		document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
	}

	async fetchProducts() {
		let response = await fetch('products.json');
		let products = await response.json();

		return products;
	}
}