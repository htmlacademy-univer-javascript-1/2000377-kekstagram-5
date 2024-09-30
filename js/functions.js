function checkStringLength(sting, maxLength) {
  return sting.length <= maxLength;
}

function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  return string === string.split('').reverse().join('');
}

function getNumberFromString(string) {
  string = String(string);
  const digits = Array();
  for (let i = 0; i < string.length; i++) {
    if ('0' <= string[i] && string[i] <= '9') {
      digits.push(string[i]);
    }
  }
  return parseInt(digits.join(''), 10);
}


function AssertThat(assertion) {
  if (!assertion) {
    throw new Error('Assertion failed');
  }
  return true;
}

// Test cases
AssertThat(checkStringLength('проверяемая строка', 20) === true);
AssertThat(checkStringLength('проверяемая строка', 18) === true);
AssertThat(checkStringLength('проверяемая строка', 10) === false);

AssertThat(isPalindrome('топот') === true);
AssertThat(isPalindrome('ДовОд') === true);
AssertThat(isPalindrome('Кекс') === false);
AssertThat(isPalindrome('Лёша на полке клопа нашёл ') === true);

AssertThat(getNumberFromString('2023 год') === 2023);
AssertThat(getNumberFromString('ECMAScript 2022') === 2022);
AssertThat(getNumberFromString('1 кефир, 0.5 батона') === 105);
AssertThat(getNumberFromString('агент 007') === 7);
AssertThat(isNaN(getNumberFromString('а я томат')));
AssertThat(getNumberFromString(2023) === 2023);
AssertThat(getNumberFromString(-1) === 1);
AssertThat(getNumberFromString(1.5) === 15);
