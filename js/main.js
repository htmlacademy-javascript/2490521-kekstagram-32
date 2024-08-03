import './pictures.js';
import './big-picture.js';
import './modal-form-upload.js';
import './validation-form.js';
import './scale-image.js';
import './image-effects.js';
import { renderThumbnails } from './pictures.js';
import { setUserFormSubmit } from './validation-form.js';
import { closeModalForm } from './modal-form-upload.js';
import { showDataError } from './render-alerts.js';


fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((thumbnails) => {
    renderThumbnails(thumbnails);
  })
  .catch(() => {
    showDataError();
  });

setUserFormSubmit(closeModalForm);


