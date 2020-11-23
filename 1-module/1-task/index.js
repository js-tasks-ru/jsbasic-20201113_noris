/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  // ваш код...
  if (n == 1 || n == 0) {
    n = 1;
    return n;
  }

  for (i = n - 1; i >= 1; i--) {
    n = n * i;
  }

  return n;
}
