import Notiflix from 'notiflix';
import ApiService from './apiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';

const apiService = new ApiService();
refs.searchForm.addEventListener('submit', search);
refs.loadMore.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryClick);

function search(event) {
  event.preventDefault();
  hideButtonLoadMore();
  clearGallery();
  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  if (apiService.query === '') {
    Notiflix.Notify.failure('The search field must be filled!!!');
    return;
  }
  apiService.resetPage();
  fechCard();
}

function onLoadMore() {
  apiService
    .fetch()
    .then(({ hits }) => {
      if (hits.length < 40) {
        Notiflix.Notify.failure(
          `We're sorry, but you've reached the end of search results.`
        );
        hideButtonLoadMore();
        return makeMurkup(hits);
      }
      return makeMurkup(hits);
    })
    .then(renderGallary);
}

function makeMurkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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

function renderGallary(murkup) {
  refs.gallery.insertAdjacentHTML('beforeend', murkup);
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}

function fechCard() {
  apiService
    .fetch()
    .then(({ totalHits, hits }) => {
      if (hits.length < 1) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return '';
      }
      if (hits.length < 40) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        return makeMurkup(hits);
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      showButtonLoadMore();
      return makeMurkup(hits);
    })
    .then(renderGallary);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showButtonLoadMore() {
  refs.loadMore.classList.remove('hide');
}

function hideButtonLoadMore() {
  refs.loadMore.classList.add('hide');
}

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
