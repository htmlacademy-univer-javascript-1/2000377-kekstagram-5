import { getData } from './api.js';
import {renderMiniatures} from './miniature-draw.js';
import { initFilters } from './filters.js';
import './upload-form/upload-form.js';
import { createPhotoDescriptions } from './data.js';


getData()
  .catch(() => {
    // eslint-disable-next-line no-console
    console.warn('Не удалось загрузить данные, взяты картинки по умолчанию');
    return new Promise((resolve) => {
      resolve(createPhotoDescriptions());
    });
  })
  .then((data) => {
    renderMiniatures(data);
    return data;
  })
  .then((data) => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    initFilters(data);
  })
  .catch((error) => {
    throw new Error(error);
  });
