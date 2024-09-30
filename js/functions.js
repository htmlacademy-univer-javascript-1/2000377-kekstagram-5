function checkStringLength(sting, maxLength) {
  return sting.length <= maxLength;
}

function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  return string === string.split('').reverse().join('');
}

function getNumberFromString(string) {
  let digits = Array();
  for (let i = 0; i < string.length; i++) {
    if ('0' <= string[i] && string[i] <= '9') {
      digits.push(string[i]);
    }
  }
  return parseInt(digits.join(''));
}
