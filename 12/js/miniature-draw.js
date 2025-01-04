import { openPhoto } from './open-photo.js';

const miniatureTemplate = document.querySelector('#picture');


export const renderMiniatures = (photoDescriptions) => {
  const miniaturesFragment = document.createDocumentFragment();

  photoDescriptions.forEach((photo) => {
    const miniature = miniatureTemplate.cloneNode(true).content.querySelector('.picture');
    const miniatureImage = miniature.querySelector('.picture__img');
    const miniatureLikes = miniature.querySelector('.picture__likes');
    const miniatureComments = miniature.querySelector('.picture__comments');

    miniatureImage.src = photo.url;
    miniatureImage.alt = photo.description;
    miniatureLikes.textContent = photo.likes;
    miniatureComments.textContent = photo.comments.length;

    miniature.addEventListener('click', () => {
      openPhoto(photo);
    });

    miniaturesFragment.appendChild(miniature);
  });


  document.querySelector('.pictures').appendChild(miniaturesFragment);
};
