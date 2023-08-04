// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import PixabayAPI from './pixabay-api';

// const pixabayInstanse = new PixabayAPI();

<<<<<<< Updated upstream
const searchFormEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const btn = document.querySelector('button');
=======
// const searchFormEl = document.querySelector('.search-form');
// const inputEl = document.querySelector('.one');
// const galleryEl = document.querySelector('.gallery');
>>>>>>> Stashed changes

// searchFormEl.addEventListener('submit', onSearchFormSubmit);

<<<<<<< Updated upstream
function onSearchFormSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  pixabayInstanse.query = inputEl.value;
  pixabayInstanse
    .fetchImages()
    .then(({ data }) => createMarkup(data.hits))
    .then(renderMarkup);
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
=======
// function onSearchFormSubmit(e) {
//   e.preventDefault();
//   pixabayInstanse.query = inputEl.value;
//   pixabayInstanse
//     .fetchImages()
//     .then(({ data }) => createMarkup(data.hits))
//     .then(renderMarkup);
//   e.target.reset();
// }

// function createMarkup(data) {
//   return data
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<a href=${largeImageURL}>
//         <div class="photo-card">
//   <img src=${webformatURL} alt=${tags} loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b${downloads}</b>
//     </p>
//   </div>
// </div></a>`;
//       }
//     )
//     .join('');
// }

// function renderMarkup(murkup) {
//   galleryEl.insertAdjacentHTML('beforeend', murkup);
// }

const BASE_URL = 'https://restcountries.com/v3.1/name/';

async function fetchCountry() {
  const response = await fetch(`${BASE_URL}Ukraine`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const data = await response.json();
  return data;
}

fetchCountry().then(console.log).catch(console.log);
>>>>>>> Stashed changes
