import createElement from '../../assets/lib/create-element.js';

// export default class Carousel {
// 	constructor(slides) {
// 		this.slides = slides;
// 		this.elem = this.render();
// 	}
// 	render() {
// 		//Создаем родительский элемент
// 		// this.elem = document.createElement("div");
// 		let carousel = document.createElement("div");
// 		carousel.classList = "carousel";
// 		let templateButton = `
// 			<div class="carousel__arrow carousel__arrow_right">
// 				<img src="/assets/images/icons/angle-icon.svg" alt="icon">
// 			</div>
// 			<div class="carousel__arrow carousel__arrow_left">
// 				<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
// 			</div>
// 			<div class="carousel__inner"></div>`;

// 		carousel.insertAdjacentHTML("beforeend", templateButton);
// 		let carouselInner = carousel.querySelector(".carousel__inner");

// 		//Создаем слайды
// 		for (let slide of this.slides) {
// 			let templateSlides = `
// 				<div class="carousel__slide" data-id="${slide.id}">
// 					<img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
// 					<div class="carousel__caption">
// 						<span class="carousel__price">€${slide.price.toFixed(2)}</span>
// 						<div class="carousel__title">${slide.name}</div>
// 						<button type="button" class="carousel__button">
// 							<img src="/assets/images/icons/plus-icon.svg" alt="icon">
// 						</button>
// 					</div>
// 				</div>`;

// 			carouselInner.insertAdjacentHTML("beforeend", templateSlides)
// 		}

// 		//Генерация событий
// 		let button = carousel.querySelector(".carousel__button");
// 		let event = new CustomEvent("product-add", {
// 			detail: button.parentNode.parentNode.dataset.id,
// 			bubbles: true,
// 		})
// 		button.addEventListener("click", () => {
// 			carousel.dispatchEvent(event);
// 		})

// 		//Предыдущий код слайдера
// 		let buttonLeft = carousel.querySelector(".carousel__arrow_left");
// 		let buttonRight = carousel.querySelector(".carousel__arrow_right");
// 		let sliderInner = carousel.querySelector(".carousel__inner");
// 		let sliderWidth = carousel.querySelector(".carousel__slide");
// 		let click = 0;
// 		let sum = 0;

// 		buttonLeft.style.display = "none";

// 		buttonRight.onclick = () => {
// 			buttonLeft.style.display = "flex";
// 			sum -= sliderWidth.offsetWidth;
// 			sliderInner.style.transform = `translateX(${sum}px)`;
// 			++click;

// 			if (click == this.slides.length - 1) {
// 				buttonRight.style.display = "none";
// 			}

// 		};

// 		buttonLeft.onclick = () => {
// 			buttonRight.style.display = "flex";
// 			sum += sliderWidth.offsetWidth;
// 			sliderInner.style.transform = `translateX(${sum}px)`;
// 			--click;

// 			if (sum == 0) {
// 				buttonLeft.style.display = "none";
// 			}
// 		};

// 		return carousel;
// 	}
// }

export default class Carousel {

	constructor(slides) {
		this.slides = slides;

		this.currentSlideNumber = 0;
		this.render();
		this.addEventListeners();
	}

	render() {
		this.elem = createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
          </div>
          <div class="carousel__inner"></div>
        </div>
        `);

		let slides = this.slides.map(item => createElement(`
      <div class="carousel__slide" data-id="${item.id}">
        <img
          src="/assets/images/carousel/${item.image}"
          class="carousel__img"
          alt="slide"
        />
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon" />
          </button>
        </div>
      </div>`));

		this.sub('inner').append(...slides);

		this.update();
	}

	addEventListeners() {
		this.elem.onclick = ({ target }) => {
			let button = target.closest('.carousel__button');
			if (button) {
				let id = target.closest('[data-id]').dataset.id;

				this.elem.dispatchEvent(new CustomEvent('product-add', {
					detail: id,
					bubbles: true
				}));
			}

			if (target.closest('.carousel__arrow_right')) {
				this.next();
			}

			if (target.closest('.carousel__arrow_left')) {
				this.prev();
			}
		};
	}

	sub(ref) {
		return this.elem.querySelector(`.carousel__${ref}`);
	}

	next() {
		this.currentSlideNumber++;
		this.update();
	}

	prev() {
		this.currentSlideNumber--;
		this.update();
	}

	update() {
		let offset = -this.elem.offsetWidth * this.currentSlideNumber;
		this.sub('inner').style.transform = `translateX(${offset}px)`;

		if (this.currentSlideNumber == this.slides.length - 1) {
			this.sub('arrow_right').style.display = 'none';
		} else {
			this.sub('arrow_right').style.display = '';
		}

		if (this.currentSlideNumber == 0) {
			this.sub('arrow_left').style.display = 'none';
		} else {
			this.sub('arrow_left').style.display = '';
		}
	}

}