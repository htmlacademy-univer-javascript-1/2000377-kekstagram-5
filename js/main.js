import { getData } from './api.js';
import {renderMiniatures} from './miniature-draw.js';
import './upload-form/upload-form.js';


getData()
  .then((data) => {
    renderMiniatures(data);
  })
  .catch((error) => {
    throw new Error(error);
  });
