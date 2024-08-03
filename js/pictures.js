const pictureList = document.querySelector('.pictures');
const pictureItemTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const similarPictureListFragment = document.createDocumentFragment();

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

};
export {renderThumbnails};
