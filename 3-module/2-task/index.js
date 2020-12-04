/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  // ваш код...
  let newArr = arr.filter((el) => {
	return el >= a && el < b;
  })

  return newArr;
}
