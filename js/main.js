import { getData } from './api.js';
import {renderMiniatures} from './miniature-draw.js';
import { initFilters } from './filters.js';
import './upload-form/upload-form.js';

const GET_DATA_ERROR_MESSAGE_TIMEOUT = 10000;


getData()
  .then((data) => {
    renderMiniatures(data);
    return data;
  })
  .then((data) => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    initFilters(data);
  })
  .catch((error) => {
    showGetDataErrorMessage(error.message);
  });


function showGetDataErrorMessage() {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('get-data-error-message');
  errorMessage.textContent = 'Не удалось загрузить данные. Пожалуйста, перезагрузите страницу';

  document.querySelector('main').insertAdjacentElement('afterbegin', errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, GET_DATA_ERROR_MESSAGE_TIMEOUT);
}
