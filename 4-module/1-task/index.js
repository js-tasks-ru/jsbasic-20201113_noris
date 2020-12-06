/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement("ul");

  friends.map( item => {

	let li = document.createElement("li");

	ul.appendChild(li);
	li.innerHTML = `${item.firstName} ${item.lastName}`;
  })

  document.body.appendChild(ul);

  return ul;
}
