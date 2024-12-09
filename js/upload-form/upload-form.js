/* eslint-disable no-use-before-define */
import { pristine } from './validate-form.js';
import { postData } from '../api.js';
import { updateEffect } from './edit-picture.js';

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const previewImg = imgUploadForm.querySelector('.img-upload__preview img');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const scaleControlInput = imgUploadForm.querySelector('.scale__control--value');
const effectLevelRadios = imgUploadForm.querySelectorAll('.effects__radio');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const message = {
  success: 'success',
  error: 'error'
};


const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closePreview();
  }
};


function showPreview() {
  imgUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
}


function closePreview () {
  imgUploadOverlay.classList.add('hidden');

  previewImg.src = '';
  imgUploadInput.value = '';
  descriptionInput.value = '';
  hashtagsInput.value = '';
  scaleControlInput.value = '100%';
  effectLevelRadios[0].checked = true;
  updateEffect();


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

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      removeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!messageInner.contains(evt.target)) {
      removeMessage();
    }
  };
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
    hashtagsInput.focus();
  }
});


function escStopPropagation(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}
descriptionInput.addEventListener('keydown', escStopPropagation);
hashtagsInput.addEventListener('keydown', escStopPropagation);
