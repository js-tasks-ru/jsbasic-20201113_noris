/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // ваш код...
  if (str == '') {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
}
