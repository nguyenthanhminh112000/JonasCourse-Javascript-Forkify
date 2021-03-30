import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Newly recipe was successfully uploaded';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }
  _generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST123123" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST123213123" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="https://scontent.fdad8-1.fna.fbcdn.net/v/t1.0-1/p200x200/161458165_1396372880715698_5408058603084890054_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=7206a8&_nc_ohc=p_nqdiuEQxMAX-XV0ey&_nc_ht=scontent.fdad8-1.fna&tp=6&oh=f07c8d26d6cc65443a7403468d5a593f&oe=60858C45" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST12312323" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input value="0.5,kg,Rice" type="text" required name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 2</label>
    <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 3</label>
    <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 4</label>
    <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 5</label>
    <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 6</label>
    <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
  toggleHiddenClass() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', () => {
      const nodes = Array.from(this._parentElement.children);
      if (
        nodes[0].classList.contains('error') ||
        nodes[0].classList.contains('message')
      ) {
        this.render('pass');
      }
      this.toggleHiddenClass();
    });
  }
  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', () => {
      this.toggleHiddenClass();
    });
    this._overlay.addEventListener('click', () => {
      this.toggleHiddenClass();
    });
  }
  addHandlerAddRecipe(handler) {
    this._parentElement.addEventListener('submit', element => {
      element.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
