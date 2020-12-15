function initCarousel() {
	// ваш код...
	let buttonLeft = document.querySelector(".carousel__arrow_left");
	let buttonRight = document.querySelector(".carousel__arrow_right");
	let sliderInner = document.querySelector(".carousel__inner");
	let sliderWidth = document.querySelector(".carousel__slide").offsetWidth;
	let sum = 0;
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
}
