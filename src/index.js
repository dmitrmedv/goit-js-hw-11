import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import PixabayAPI from './pixabay-api';

const pixabayInstanse = new PixabayAPI();

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const btn = document.querySelector('button');

searchFormEl.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  pixabayInstanse.query = inputEl.value;
  pixabayInstanse
    .fetchImages()
    .then(({ data }) => createMarkup(data.hits))
    .then(renderMarkup);
  event.target.reset();
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
        return `
        <div class="photo-card">
  <a href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
    <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
    <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
    <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

function renderMarkup(murkup) {
  galleryEl.insertAdjacentHTML('beforeend', murkup);
}
