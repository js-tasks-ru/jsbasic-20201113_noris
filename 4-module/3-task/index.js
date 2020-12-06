/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

	let rows = table.querySelector("tbody").children;

	for(let child of rows) {

		let status = child.cells[3]
		let gender = child.cells[2]
		let age = child.cells[1]

		if(status.getAttribute("data-available") === "true") {
			child.classList.add("available")
		} else if(status.getAttribute("data-available") === "false") {
			child.classList.add("unavailable")
		}

		if(!status.hasAttribute("data-available")) {
			child.setAttribute("hidden", "")
		}

		if(gender.innerHTML == "m"){
			child.classList.add("male")
		} else if (gender.innerHTML == "f") {
			child.classList.add("female")
		}

		if(age.innerHTML < 18) {
			child.style="text-decoration: line-through";
		}
	}
}
