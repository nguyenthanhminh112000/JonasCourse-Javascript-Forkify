/////////////////////////////// IMPORT
import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
//////// const { async } = require('q');
import { async } from 'regenerator-runtime';

////////////////// THESE LINES OF CODE WILL STOP APPLICATION RELOAD ITSELF AFTER CHANGING THE CODE
if (module.hot) {
  module.hot.accept();
}
////////////////////////////// WRITE CONTROL-FUNCTION
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. Get the query
    const query = searchView.getQuery();
    if (!query) {
      return;
    }

    // 2. Get the results
    await model.loadSearchResults(query);
    //if (!model.state.search.results) return;
    // if the results was nothing
    // 3. Render the results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////// INIT AND SET-UP
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
