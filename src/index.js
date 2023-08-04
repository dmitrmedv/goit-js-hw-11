import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import PixabayAPI from './pixabay-api';

const pixabayInstanse = new PixabayAPI();

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
galleryEl.addEventListener('click', onGalleryClick);

loadMoreBtn.classList.add('hide');
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', loadMore);

function onSearchFormSubmit(event) {
  event.preventDefault();
  if (!inputEl.value) {
    return;
  }
  galleryEl.innerHTML = '';
  // pixabayInstanse.resetPage();
  loadMoreBtn.classList.add('hide');
  pixabayInstanse.query = inputEl.value.trim();
  pixabayInstanse
    .fetchImages()
    .then(({ data: { totalHits, hits } }) => {
      if (!totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
      if (totalHits > pixabayInstanse.per_page) {
        loadMoreBtn.classList.remove('hide');
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      pixabayInstanse.changePage();
      return createMarkup(hits);
    })
    .then(renderMarkup)
    .catch(error => console.log(error));
  // event.target.reset();
}

function loadMore() {
  pixabayInstanse
    .fetchImages()
    .then(({ data: { totalHits, hits } }) => {
      pixabayInstanse.changePage();
      if (totalHits) return createMarkup(hits);
    })
    .then(renderMarkup)
    .catch(error => console.log(error));
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

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

function renderMarkup(murkup) {
  galleryEl.insertAdjacentHTML('beforeend', murkup);
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}
