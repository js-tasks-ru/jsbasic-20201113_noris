/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
	 *          name: '',
	 *          age: 25,
	 *          salary: '1000',
	 *          city: 'Petrozavodsk'
	 *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
	constructor(rows) {
		this.data = rows;
		this.elem = this.render();
	}

	render() {
		this.table = document.createElement("table");
		let template = `
		<thead>
				<tr>
					<th>Имя</th>
					<th>Возраст</th>
					<th>Зарплата</th>
					<th>Город</th>
					<th></th>
				</tr>
		</thead>
		<tbody></tbody>`;

		this.table.insertAdjacentHTML("beforeend", template);
		let tbody = this.table.querySelector("tbody");

		for (let prop of this.data) {

			let tmp = `
				<tr>
					<td>${prop.name}</td>
					<td>${prop.age}</td>
					<td>${prop.salary}</td>
					<td>${prop.city}</td>
					<td>
						<button>X</button>
					</td>
				</tr>`;

			tbody.insertAdjacentHTML("beforeend", tmp);
		}

		this.table.addEventListener("click", e => {
			if (e.target.closest("button")) {
				e.target.closest('tr').remove();
			};
		});

		return this.table;
	}
}
