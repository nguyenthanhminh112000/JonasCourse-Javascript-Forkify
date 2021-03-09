import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  //   data;
  //   _clear() {}
  //   render(data) {}
  //   renderSpinner = function () {};
  //   renderError = function (message = this._errorMessage) {};
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    //logic of pagination
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto=${
        curPage + 1
      }  class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> `;
    }
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>`;
    }

    if (curPage < numPages) {
      return `
      <button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
  `;
    }
    return '';
  }
}

export default new PaginationView();
