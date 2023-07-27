import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import PixabayAPI from './pixabay-api';

const pixabayInstanse = new PixabayAPI();

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.one');
const galleryEl = document.querySelector('.gallery');

searchFormEl.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();
  pixabayInstanse.query = inputEl.value;
  pixabayInstanse
    .fetchImages()
    .then(({ data }) => renderMarkup(createMarkup(data.hits)));
  e.target.reset();
}

function createMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href=${largeImageURL}>
        <div class="photo-card">
  <img src=${webformatURL} alt=${tags} loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b${downloads}</b>
    </p>
  </div>
</div></a>`;
      }
    )
    .join('');
}

function renderMarkup(murkup) {
  galleryEl.insertAdjacentHTML('beforeend', murkup);
}
