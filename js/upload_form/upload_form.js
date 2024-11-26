import { pristine } from './validate_form.js';

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const previewImg = imgUploadForm.querySelector('.img-upload__preview img');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const scaleControlInput = imgUploadForm.querySelector('.scale__control--value');
const effectLevelInput = imgUploadForm.querySelector('.effect-level__value');


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
  effectLevelInput.value = '';


  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}


imgUploadInput.addEventListener('change', showPreview);
imgUploadCancel.addEventListener('click', closePreview);


imgUploadForm.addEventListener('submit', (event) => {
  if (!pristine.validate()) {
    event.preventDefault();
  }
});


function escStopPropagation(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}
descriptionInput.addEventListener('keydown', escStopPropagation);
hashtagsInput.addEventListener('keydown', escStopPropagation);
