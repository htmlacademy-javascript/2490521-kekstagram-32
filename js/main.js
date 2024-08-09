import './pictures.js';
import './big-picture.js';
import './modal-form-upload.js';
import './validation-form.js';
import './scale-image.js';
import './image-effects.js';
import { renderThumbnailsFromFilter } from './pictures.js';
import { setUserFormSubmit } from './validation-form.js';
import { closeModalForm } from './modal-form-upload.js';
import { showDataError } from './render-alerts.js';
import { getData } from './api.js';


getData()
  .then((data) => {
    renderThumbnailsFromFilter(data);
  })
  .catch(() => {
    showDataError();
  });

setUserFormSubmit(closeModalForm);


