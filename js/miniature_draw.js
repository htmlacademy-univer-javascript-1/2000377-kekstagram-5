import { createPhotoDescriptions } from './data.js';

const mitiatureTemplate = document.querySelector('#picture');
const miniaturesFragment = document.createDocumentFragment();

createPhotoDescriptions().forEach((photo) => {
  const miniature = mitiatureTemplate.cloneNode(true).content.querySelector('.picture');
  const miniatureImage = miniature.querySelector('.picture__img');
  const miniatureLikes = miniature.querySelector('.picture__likes');
  const miniatureComments = miniature.querySelector('.picture__comments');

  miniatureImage.src = photo.url;
  miniatureImage.alt = photo.description;
  miniatureLikes.textContent = photo.likes;
  miniatureComments.textContent = photo.comments.length;

  miniaturesFragment.appendChild(miniature);
});


document.querySelector('.pictures').appendChild(miniaturesFragment);
