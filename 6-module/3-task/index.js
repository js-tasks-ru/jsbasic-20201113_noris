import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
	constructor(slides) {
		this.slides = slides;
		this.elem = this.render();
	}
	render() {
		//Создаем родительский элемент
		// this.elem = document.createElement("div");
		let carousel = document.createElement("div");
		carousel.classList = "carousel";
		let templateButton = `
			<div class="carousel__arrow carousel__arrow_right">
				<img src="/assets/images/icons/angle-icon.svg" alt="icon">
			</div>
			<div class="carousel__arrow carousel__arrow_left">
				<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
			</div>
			<div class="carousel__inner"></div>`;

		carousel.insertAdjacentHTML("beforeend", templateButton);
		let carouselInner = carousel.querySelector(".carousel__inner");

		//Создаем слайды
		for (let slide of this.slides) {
			let templateSlides = `
				<div class="carousel__slide" data-id="${slide.id}">
					<img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
					<div class="carousel__caption">
						<span class="carousel__price">€${slide.price.toFixed(2)}</span>
						<div class="carousel__title">${slide.name}</div>
						<button type="button" class="carousel__button">
							<img src="/assets/images/icons/plus-icon.svg" alt="icon">
						</button>
					</div>
				</div>`;

			carouselInner.insertAdjacentHTML("beforeend", templateSlides)
		}

		//Генерация событий
		let button = carousel.querySelector(".carousel__button");
		let event = new CustomEvent("product-add", {
			detail: button.parentNode.parentNode.dataset.id,
			bubbles: true,
		})
		button.addEventListener("click", () => {
			carousel.dispatchEvent(event);
		})

		// setTimeout(() => {
		//Предыдущий код слайдера

		let buttonLeft = carousel.querySelector(".carousel__arrow_left");
		let buttonRight = carousel.querySelector(".carousel__arrow_right");
		let sliderInner = carousel.querySelector(".carousel__inner");
		let sliderWidth

		let sum = 0;

		document.addEventListener("DOMContentLoaded", () => {

			sliderWidth = document.querySelector(".carousel__slide").offsetWidth;
			console.log(sliderWidth)

		})

		buttonLeft.style.display = "none";
		buttonRight.onclick = () => {

			buttonLeft.style.display = "flex";
			sum -= sliderWidth;
			sliderInner.style.transform = `translateX(${sum}px)`;

			if (sum == -sliderWidth * 3) {
				buttonRight.style.display = "none";
			}

		};

		buttonLeft.onclick = () => {

			buttonRight.style.display = "flex";
			sum += sliderWidth
			sliderInner.style.transform = `translateX(${sum}px)`;

			if (sum == 0) {
				buttonLeft.style.display = "none";
			}
		};
		// }, 0)

		return carousel;
	}
}
