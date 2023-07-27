import axios from 'axios';

export default class PixabayAPI {
  #BASE_KEY = '35664660-00618b4ff35f66be868ea843f';
  #BASE_URL = 'https://pixabay.com/api/';

  page = 1;
  query = null;

  fetchImages() {
    const baseSearchParams = new URLSearchParams({
      key: this.#BASE_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
      q: this.query,
    });

    return axios.get(`${this.#BASE_URL}?${baseSearchParams}`);
  }

  changePage() {
    return (this.page = +this.page);
  }
}
