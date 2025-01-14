import { renderMiniatures } from './miniature-draw.js';
import { debounce } from './util.js';


const RANDOM_PICTURES_COUNT = 10;
const FILTER_DEBOUNCE_DELAY = 500;

const ELEMENTS_BEFORE_MINIATURES_COUNT = 2;

const picturesElement = document.querySelector('.pictures');

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

let activeButton = defaultFilterButton;


export function initFilters(data) {
  const filterDebounce = debounce(filter, FILTER_DEBOUNCE_DELAY);

  defaultFilterButton.addEventListener('click', () => {
    changeActiveButton(defaultFilterButton);
    filterDebounce(data);
  });
  randomFilterButton.addEventListener('click', () => {
    changeActiveButton(randomFilterButton);
    filterDebounce(data);
  });
  discussedFilterButton.addEventListener('click', () => {
    changeActiveButton(discussedFilterButton);
    filterDebounce(data);
  });
}


function filter(data) {
  clearPictures();
  switch (activeButton) {
    case defaultFilterButton:
      renderMiniatures(data);
      break;
    case randomFilterButton:
      renderMiniatures(getRandomPictures(data));
      break;
    case discussedFilterButton:
      renderMiniatures(getDiscussedPictures(data));
      break;
  }
}


function changeActiveButton(newActiveButton) {
  activeButton.classList.remove('img-filters__button--active');
  activeButton = newActiveButton;
  activeButton.classList.add('img-filters__button--active');
}


function clearPictures() {
  const children = picturesElement.children;

  // Удаляем все дочерние элементы, кроме первых двух:
  // первый - заголовок "Фотографии других пользователей"
  // второй - поле для загрузки изображения на сайт
  while (children.length > ELEMENTS_BEFORE_MINIATURES_COUNT) {
    picturesElement.removeChild(children[ELEMENTS_BEFORE_MINIATURES_COUNT]);
  }
}


function getRandomPictures(pictures) {
  const randomPictures = new Set();

  while (randomPictures.size < RANDOM_PICTURES_COUNT && randomPictures.size < pictures.length) {
    const randomIndex = Math.floor(Math.random() * pictures.length);
    const randomPicture = pictures[randomIndex];
    randomPictures.add(randomPicture);
  }

  return [...randomPictures];
}

function getDiscussedPictures(pictures) {
  return [...pictures].sort((a, b) => b.comments.length - a.comments.length);
}
