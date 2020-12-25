import createElement from '../../assets/lib/create-element.js';

export default class Modal {
	constructor() {
	}

	setTitle(title) {
		this.title = title;
		let modalTitle = document.querySelector('.modal__title');
		if (modalTitle) {
			modalTitle.textContent = this.title;
		}
	}

	setBody(node) {
		this.body = node.outerHTML;
		let modalBody = document.querySelector(".modal__body");
		if (modalBody) {
			modalBody.innerHTML = "";
			modalBody.insertAdjacentElement('afterBegin', node);
		}
	}

	open() {
		this.activeClass = "is-modal-open";
		let modal = `
			<div class='modal'>
				<div class="modal__overlay"></div>

				<div class="modal__inner">
					<div class="modal__header">

						<button type="button" class="modal__close">
							<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
						</button>

						<h3 class="modal__title">
							${this.title}
						</h3>
					</div>

					<div class="modal__body">
						${this.body}
					</div>
				</div>
			</div>`;

		document.body.insertAdjacentHTML("beforeend", modal);
		document.body.classList.add("is-modal-open");

		let closeButton = document.querySelector(".modal__close");
		closeButton.addEventListener("click", () => this.close());

		window.addEventListener("keydown", this.EscClose);

	}

	EscClose = event => {
		if (event.code === 'Escape') {
			this.close();
		}
	}

	close() {
		let modal = document.querySelector(".modal")

		if (modal) {
			modal.remove();
			document.body.classList.remove(this.activeClass);
			window.removeEventListener("keydown", this.EscClose);
		}


	}
}
