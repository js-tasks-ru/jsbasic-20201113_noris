/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  // ваш код...
  str = str.toLowerCase();

  if (str.includes("1xbet") || str.includes("xxx")) {
    return true;
  }

  return false;
}
