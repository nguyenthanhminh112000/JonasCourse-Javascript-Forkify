/////////////////////////////// IMPORT
import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import { DEFAULT } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
//////// const { async } = require('q');
import { async } from 'regenerator-runtime';

////////////////// THESE LINES OF CODE WILL STOP APPLICATION RELOAD ITSELF AFTER CHANGING THE CODE
// if (module.hot) {
//   module.hot.accept();
// }
////////////////////////////// WRITE CONTROL-FUNCTION
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.render(model.getSearchResultsPage());
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
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
    // 3. Render the results
    resultsView.render(model.getSearchResultsPage(DEFAULT));
    // 4. Render the pagination only one time
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
  console.log(gotoPage);
};

const controlServings = function (newServings) {
  // update the data in state
  model.updateServings(newServings);
  //update recipeView
  recipeView.update(model.state.recipe);
};

//////////////////////////// INIT AND SET-UP
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
