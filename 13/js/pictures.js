import { debounce } from './util.js';

const TIMEOUT_DELAY = 500;
const MAX_LENGTH_OF_UNIQE_THUMBNAILS = 10;

const pictureList = document.querySelector('.pictures');
const pictureItemTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const similarPictureListFragment = document.createDocumentFragment();
const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = imageFilters.querySelector('.img-filters__form');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
let savedData = [];

const getSavedData = () => savedData;

const renderThumbnails = (similarThumbnails) => {
  similarThumbnails.forEach(({url, description, comments, likes, id}) => {
    const pictureElement = pictureItemTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    similarPictureListFragment.append(pictureElement);
    pictureElement.dataset.id = id;
  });
  pictureList.append(similarPictureListFragment);
  imageFilters.classList.remove('img-filters--inactive');
};

const uniqueThumbnails = (similarThumbnails) => {
  const resultSet = new Set();
  while (resultSet.size < MAX_LENGTH_OF_UNIQE_THUMBNAILS) {
    resultSet.add(similarThumbnails[Math.floor(Math.random() * similarThumbnails.length)]);
  }
  return Array.from(resultSet);
};

const sortPosts = (postA, postB) => {
  const firstPost = postA.comments.length;
  const secondPost = postB.comments.length;
  return secondPost - firstPost;
};

const setFilters = () => {
  if (defaultFilterButton.classList.contains('img-filters__button--active')) {
    renderThumbnails(savedData);
  }
  if(randomFilterButton.classList.contains('img-filters__button--active')) {
    const randomThumbnails = uniqueThumbnails(savedData);
    renderThumbnails(randomThumbnails);
  }
  if(discussedFilterButton.classList.contains('img-filters__button--active')) {
    const sortThumbnails = savedData.slice().sort(sortPosts);
    renderThumbnails(sortThumbnails);
  }
};

const selectFilter = (evt) => {
  const currentButton = evt.target;
  pictureList.querySelectorAll('.picture').forEach((picture) => picture.remove());
  imageFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  currentButton.classList.toggle('img-filters__button--active');
  setFilters();
};

const initialRenderThumbnails = (data) => {
  savedData = data;
  renderThumbnails(savedData);
  imageFiltersForm.addEventListener('click', debounce((selectFilter), TIMEOUT_DELAY));
};


export {renderThumbnails, getSavedData, initialRenderThumbnails};
