const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const hideBigPictureBtn = document.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');


function createCommentsFragment(comments) {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentPicture = document.createElement('img');
    commentPicture.classList.add('social__picture');
    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentPicture.width = 35;
    commentPicture.height = 35;
    commentElement.appendChild(commentPicture);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentElement.appendChild(commentText);

    commentsFragment.appendChild(commentElement);
  });

  return commentsFragment;
}

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closePhoto();
  }
};


export const openPhoto = (photo) => {
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  bigPictureDescription.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureComments.innerHTML = '';
  bigPictureComments.appendChild(createCommentsFragment(photo.comments));

  // Разобраться в следующих практиках
  bigPictureSocialCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
};


hideBigPictureBtn.addEventListener('click', () => {
  closePhoto();
});

