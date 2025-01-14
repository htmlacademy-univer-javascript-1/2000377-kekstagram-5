const MAX_HASHTAG_LENGTH = 19; // Без решетки
const MAX_HASHTAGS_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');

let errorMessage = 'Неверный ввод';

export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getErrorMessage
);


function getErrorMessage() {
  return errorMessage;
}

function isInvalidHashtag(inputValue) {
  const hashtagRegex = new RegExp(`(^|\\s)(#[A-Za-zА-Яa-yayoЁ0-9]{1,${MAX_HASHTAG_LENGTH}})(?=\\s|$)`, 'g');

  if (inputValue === '') {
    return false;
  }

  const hashtags = inputValue.match(hashtagRegex);
  const words = inputValue.trim().split(/\s+/);

  if (!hashtags) {
    return true;
  }

  if (words.length !== hashtags.length) {
    return true;
  }

  // Регистрация
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.trim().toLowerCase()));

  if (uniqueHashtags.size !== hashtags.length) {
    return true;
  }

  const nonHashtagPatterns = [
    /(^|\s)([A-Za-zА-Яa-yayoЁ0-9]+)/,
    /[^ ]#/,
    /# /,
    /#$/
  ];

  for (const nonPattern of nonHashtagPatterns) {
    if (nonPattern.test(inputValue)) {
      return true;
    }
  }

  return false;
}

function isExceededHashtagCount(hashtags) {
  const uniqueHashtags = [...new Set(hashtags.map((tag) => tag.trim()))];
  return uniqueHashtags.length > MAX_HASHTAGS_COUNT;
}

function hasDuplicateHashtags(hashtags) {
  const seenHashtags = new Set();
  for (const tag of hashtags) {
    const trimmedTag = tag.trim();
    if (seenHashtags.has(trimmedTag)) {
      return true;
    }
    seenHashtags.add(trimmedTag);
  }
  return false;
}

function validateHashtags() {
  const inputValue = hashtagsInput.value;
  if (isInvalidHashtag(inputValue)) {
    errorMessage = 'Введен невалидный хэштег';
    return false;
  }

  const hashtags = inputValue.match(/(#([A-Za-zА-Яа-яёЁ0-9]+))/g);
  if (hashtags && isExceededHashtagCount(hashtags)) {
    errorMessage = 'Превышено количество хэштегов';
    return false;
  }

  if (hashtags && hasDuplicateHashtags(hashtags)) {
    errorMessage = 'Хэштеги повторяются';
    return false;
  }

  return true;
}
