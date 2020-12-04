/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  // ваш код...
  str = str
  .split(" ")
  .join(",")
  .split(",")
  .map( el => {
    let numberEl = parseFloat(el);

    if(typeof numberEl === "number") {
      return numberEl;
    }

  })
  .filter( item => {
    return !isNaN(item)
  })

  let min = Math.min(...str);
  let max = Math.max(...str);

  return {
    min: min,
    max: max,
  }
}
