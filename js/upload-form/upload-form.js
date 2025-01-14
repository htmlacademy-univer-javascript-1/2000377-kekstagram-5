import { pristine } from './validate-form.js';
import { postData } from '../api.js';
import { updateEffect } from './edit-picture.js';
import { isEscapeKey } from '../util.js';

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const previewImg = imgUploadForm.querySelector('.img-upload__preview img');
const descriptionInputElement = imgUploadForm.querySelector('.text__description');
const hashtagsInputElement = imgUploadForm.querySelector('.text__hashtags');
const scaleControlInput = imgUploadForm.querySelector('.scale__control--value');
const effectLevelRadios = imgUploadForm.querySelectorAll('.effects__radio');
const effectsPreview = imgUploadForm.querySelectorAll('.effects__preview');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const message = {
  success: 'success',
  error: 'error'
};


const onDocumentKeydown = (evt) => {
  const errorMessageElement = document.querySelector('.error');
  if (isEscapeKey(evt) && !errorMessageElement) {
    evt.preventDefault();
    closePreview();
  }
};


function showPreview() {
  imgUploadOverlay.classList.remove('hidden');

  const imgURL = URL.createObjectURL(imgUploadInput.files[0]);
  previewImg.src = imgURL;
  for (const miniature of effectsPreview) {
    miniature.style.backgroundImage = `url(${ imgURL.toString() })`;
  }

  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
}


function closePreview () {
  imgUploadOverlay.classList.add('hidden');

  previewImg.src = '';
  imgUploadInput.value = '';
  descriptionInputElement.value = '';
  hashtagsInputElement.value = '';
  scaleControlInput.value = '100%';
  effectLevelRadios[0].checked = true;
  previewImg.style.transform = 'scale(1)';
  updateEffect();

  document.querySelectorAll('.pristine-error').forEach((errorMessage) => {
    errorMessage.remove();
  });


  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}


imgUploadInput.addEventListener('change', showPreview);
imgUploadCancel.addEventListener('click', closePreview);


function showMessage(messageType) {
  const template = document.querySelector(`#${messageType}`).content.querySelector('section');
  const messageElement = template.cloneNode(true);
  const messageInner = messageElement.querySelector(`.${messageType}__inner`);

  const removeMessage = () => {
    body.removeChild(messageElement);
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  messageElement.querySelector('button').addEventListener('click', removeMessage);

  function onEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      removeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!messageInner.contains(evt.target)) {
      removeMessage();
    }
  }

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);

  body.appendChild(messageElement);
}


imgUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    const formData = new FormData(imgUploadForm);
    postData(formData)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        closePreview();
        showMessage(message.success);
      })
      .catch(() => {
        showMessage(message.error);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  } else {
    hashtagsInputElement.focus();
  }
});


function escStopPropagation(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
descriptionInputElement.addEventListener('keydown', escStopPropagation);
hashtagsInputElement.addEventListener('keydown', escStopPropagation);
