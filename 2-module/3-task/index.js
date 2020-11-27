let calculator = {
  // ваш код
  read(a, b) {
    this.firstNumber = a;
    this.twoNumber = b;
  },

  sum() {
    return this.firstNumber + this.twoNumber;
  },

  mul() {
    return this.firstNumber * this.twoNumber;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
