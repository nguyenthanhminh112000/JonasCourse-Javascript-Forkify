/////////////////////////////// IMPORT

import * as model from './model';
import View from './views/View.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { DEFAULT, MODEL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
//////// const { async } = require('q');
import { async } from 'regenerator-runtime';
// import { from } from 'core-js/core/array';

////////////////// THESE LINES OF CODE WILL STOP APPLICATION RELOAD ITSELF AFTER CHANGING THE CODE
// if (module.hot) {
//   module.hot.accept();
// }
////////////////////////////// WRITE CONTROL-FUNCTION
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
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
    bookmarksView.update(model.state.bookmarks);
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
  resultsView.update(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the data in state
  model.updateServings(newServings);
  //update recipeView
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // changing the data
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //re render recipeView
  recipeView.update(model.state.recipe);
  // render bookmarkView
  bookmarksView.render(model.state.bookmarks);
};
const controlStorage = function () {
  model.init();
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //render spinner for the user
    addRecipeView.renderSpinner();

    // upload newRecipe to the server
    await model.uploadRecipe(newRecipe);

    // render newly Created Recipe
    recipeView.render(model.state.recipe);

    // change the hash
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //render resultsView and bookmarksView
    bookmarksView.render(model.state.bookmarks);

    // render success announcement
    addRecipeView.renderMessage();
    
    // close window && overlay
    setTimeout(() => {
      addRecipeView.toggleHiddenClass();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log(`${error.message} :)))))))))))))`);
    addRecipeView.renderError(`${error.message}`);
  }
};
//////////////////////////// INIT AND SET-UP
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  View.addHandlerStorage(controlStorage);
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
  controlStorage();
};
init();
