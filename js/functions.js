function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
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


function AssertThat(assertion, message = '') {
  if (!assertion) {
    throw new Error(`Assertion failed: ${message}`);
  }
  return true;
}

function stringTimeToMinutes(time) {
  const hoursMinutes = time.split(':');
  return parseInt(hoursMinutes[0], 10) * 60 + parseInt(hoursMinutes[1], 10);
}

function isInWorkingTime(workStart, workEnd, meetingStart, meetingDuration) {
  workStart = stringTimeToMinutes(workStart);
  workEnd = stringTimeToMinutes(workEnd);
  meetingStart = stringTimeToMinutes(meetingStart);
  return workStart <= meetingStart && workEnd >= meetingStart + meetingDuration;
}

// Test cases
AssertThat(checkStringLength('проверяемая строка', 20) === true, 'checkStringLength1');
AssertThat(checkStringLength('проверяемая строка', 18) === true, 'checkStringLength2');
AssertThat(checkStringLength('проверяемая строка', 10) === false, 'checkStringLength3');

AssertThat(isPalindrome('топот') === true, 'isPalindrome1');
AssertThat(isPalindrome('ДовОд') === true, 'isPalindrome2');
AssertThat(isPalindrome('Кекс') === false, 'isPalindrome3');
AssertThat(isPalindrome('Лёша на полке клопа нашёл ') === true, 'isPalindrome4');

AssertThat(getNumberFromString('2023 год') === 2023, 'getNumberFromString1');
AssertThat(getNumberFromString('ECMAScript 2022') === 2022, 'getNumberFromString2');
AssertThat(getNumberFromString('1 кефир, 0.5 батона') === 105, 'getNumberFromString3');
AssertThat(getNumberFromString('агент 007') === 7, 'getNumberFromString4');
AssertThat(isNaN(getNumberFromString('а я томат')), 'getNumberFromString5');
AssertThat(getNumberFromString(2023) === 2023, 'getNumberFromString6');
AssertThat(getNumberFromString(-1) === 1, 'getNumberFromString7');
AssertThat(getNumberFromString(1.5) === 15, 'getNumberFromString8');

AssertThat(isInWorkingTime('08:00', '17:30', '14:00', 90) === true, 'isInWorkingTime1');
AssertThat(isInWorkingTime('8:0', '10:0', '8:0', 120) === true, 'isInWorkingTime2');
AssertThat(isInWorkingTime('08:00', '14:30', '14:00', 90) === false, 'isInWorkingTime3');
AssertThat(isInWorkingTime('14:00', '17:30', '08:0', 90) === false, 'isInWorkingTime4');
AssertThat(isInWorkingTime('8:00', '17:30', '08:00', 900) === false, 'isInWorkingTime5');
