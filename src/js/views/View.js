import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner = function () {
    this._clear();
    const markup = `
      <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderError = function (message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    /// create a DOM in computer memory not CHORME
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // convert NodeList to Array
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // compare newElements with curElements
    newElements.forEach((newElement, index) => {
      const curElement = curElements[index];
      if (!curElement.isEqualNode(newElement)) {
        // changing the attributes
        Array.from(newElement.attributes).forEach(attr => {
          curElement.setAttribute(attr.name, attr.value);
        });
        // changing the text
        if (curElement.firstChild?.nodeValue.trim() !== '') {
          curElement.textContent = newElement.textContent;
        }
      }
    });
  }
  static addHandlerStorage(handler) {
    window.addEventListener('storage', handler);
  }
}
