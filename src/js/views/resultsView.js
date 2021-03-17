import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Recipes not found';
  _generateMarkup() {
    return this._data.map(previewView.generateMarkupPreview).join('');
  }
}
export default new ResultsView();
