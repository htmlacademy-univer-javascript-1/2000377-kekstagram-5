import { isEscapeKey } from './util.js';

const LOAD_MORE_COMMENT_COUNT = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const BigPictureCancelButton = document.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureShownCommentsCount = bigPicture.querySelector('.shown-comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureMoreCommentsButton = bigPicture.querySelector('.comments-loader');
let generateMoreComments;


function GetAllCommentsElements(comments) {
  const commentsList = [];

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

    commentsList.push(commentElement);
  });

  return commentsList;
}

// returns some more comments and if there are more comments to be shown
const createCommentsGenerator = (allComments, step) => {
  let currentIndex = 0;

  return () => {
    if (currentIndex >= allComments.length) {
      return { moreComments: [], countShownComments: currentIndex, runOut: true };
    }

    const nextIndex = Math.min(currentIndex + step, allComments.length);
    const moreComments = allComments.slice(currentIndex, nextIndex);
    currentIndex = nextIndex;

    return {
      moreComments: moreComments,
      countShownComments: currentIndex,
      runOut: currentIndex >= allComments.length
    };
  };
};

const showMoreComments = () => {
  const {moreComments, countShownComments, runOut} = generateMoreComments();
  bigPictureShownCommentsCount.textContent = countShownComments;

  moreComments.forEach((comment) => {
    bigPictureComments.appendChild(comment);
  });

  if (runOut) {
    bigPictureMoreCommentsButton.classList.add('hidden');
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
}


export const openPhoto = (photo) => {
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  bigPictureDescription.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureComments.innerHTML = '';
  bigPictureMoreCommentsButton.classList.remove('hidden');

  generateMoreComments = createCommentsGenerator(GetAllCommentsElements(photo.comments), LOAD_MORE_COMMENT_COUNT);
  showMoreComments();

  bigPictureMoreCommentsButton.addEventListener('click', showMoreComments);

  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
};

function closePhoto() {
  bigPicture.classList.add('hidden');
  bigPictureMoreCommentsButton.removeEventListener('click', generateMoreComments);
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}


BigPictureCancelButton.addEventListener('click', closePhoto);

