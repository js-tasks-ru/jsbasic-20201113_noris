
import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
	constructor(products) {
		this.products = products;
		this.filters = {};
		this.elem = this.render();
		this.array = [];
	}

	render() {
		this.elem2 = createElement('<div class="products-grid"><div class="products-grid__inner"></div></div>');
		this.renderContent()

		return this.elem2
	}

	renderContent() {

		let elemInner = this.elem2.querySelector(".products-grid__inner");

		elemInner.innerHTML = '';

		for (let prop of this.products) {

			if (this.filters.noNuts && prop.nuts)
				continue;
			if (this.filters.vegeterianOnly && !prop.vegeterian)
				continue;
			if (this.filters.maxSpiciness && prop.spiciness > this.filters.maxSpiciness)
				continue;
			if (this.filters.category && prop.category != this.filters.category)
				continue;

			let productCard = new ProductCard(prop);
			elemInner.append(productCard.elem);
		}
	}

	updateFilter(filters) {
		Object.assign(this.filters, filters),
			this.renderContent()
	}

}