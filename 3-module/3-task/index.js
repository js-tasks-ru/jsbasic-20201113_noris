/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  // ваш код...
  let arr = str.split('');

    arr.forEach((el, i, arr) => {

      if(el == '-'){
        arr.splice(i, 1);
        arr.splice(i, 1, arr[i].toUpperCase());
        str = arr.join("");
      }

    })

    return str;
}
