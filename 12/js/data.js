import {getRandomArrayElement, getRandomInteger, createSequenceGenerator} from './util.js';

const PHOTO_DESCRIPTIONS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const COMMENTS_MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Анна', 'Борис', 'Василий', 'Геннадий', 'Дмитрий', 'Евгений', 'Жанна', 'Захар', 'Иван',
  'Карл', 'Леонид', 'Михаил', 'Николай', 'Олег', 'Павел', 'Роман', 'Сергей', 'Татьяна', 'Федор'];

const DESCRIPTIONS = [
  'Восход солнца над горизонтом',
  'Луна в небе',
  'Прекрасный закат',
  'Звездная ночь',
  'Уютный утренний туман над озером',
  'Цветущий сад под ярким солнцем',
  'Шумный городской пейзаж на закате',
  'Снежные вершины гор под ясным небом',
  'Тёплый вечер на пляже с мерцающими огнями',
  'Лесная тропа весной, усеянная цветами',
  'Арктическое сияние над ледяной пустыней',
  'Старинный маяк на фоне бушующего моря',
  'Золотистые поля пшеницы под лазурным небом',
  'Нежный рассвет на берегу океана с лёгкими волнами',];


function createUrlGenerator () {
  const generateUrlIndex = createSequenceGenerator();
  return function () {
    const id = generateUrlIndex();
    return `photos/${id}.jpg`;
  };
}

const getDescription = () => getRandomArrayElement(DESCRIPTIONS);

function createCommensIdGenerator() {
  const existingCommentsId = new Set();
  const limit = PHOTO_DESCRIPTIONS_COUNT * (MAX_COMMENTS_COUNT + 1);
  return function () {
    let id = getRandomInteger(1, limit);
    while (existingCommentsId.has(id)) {
      id = getRandomInteger(1, limit);
    }
    existingCommentsId.add(id);
    return id;
  };
}
const generateCommentId = createCommensIdGenerator();
const generateAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;
const generateCommentMessage = () => getRandomArrayElement(COMMENTS_MESSAGES);
const generateName = () => getRandomArrayElement(NAMES);


const generateId = createSequenceGenerator();
const generateUrl = createUrlGenerator();
const generateDescription = () => getDescription();
const generateLikes = () => getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT);

const createComment = () => ({
  id: generateCommentId(),
  avatar: generateAvatar(),
  message: generateCommentMessage(),
  name: generateName(),
});

const generateComments = () => Array.from({ length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment);

const generatePhotoDescription = () => ({
  id: generateId(),
  url: generateUrl(),
  description: generateDescription(),
  likes: generateLikes(),
  comments: generateComments(),
});

export const createPhotoDescriptions = () => Array.from({ length: PHOTO_DESCRIPTIONS_COUNT }, generatePhotoDescription);
