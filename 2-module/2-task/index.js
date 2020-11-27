/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  // ваш код...

  for (let prop in obj) {
	  return false;
  }

  return true;
}
