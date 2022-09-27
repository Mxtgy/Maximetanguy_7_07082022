import { DOM, RECIPES, LIST_ARRAY } from '../utils/const.js';
import recipeFactory from '../factories/recipeFactory.js';
import { addOptionInDataList, makeOptionList } from '../utils/dataList.js';
import initFilters from '../utils/filters.js';
import search from '../utils/searchbar.js';

/*
This function return the recipes data.
*/
async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const recipes = await response.json();
  
    return { recipes: recipes.recipes };
}

/*
This function return the handlebars template.
*/
async function getTemplate() {
    const response = await fetch('./template/article.hbs');
    const article = await response.text();

    return article;
} 

  /*
  This function will launch the factory and add the element in the DOM
  + initiate the filters and search. It also add the recipes and recipes ids in an array. 
  */
  async function displayData(recipes, article) {
    
    recipes.forEach((recipe) => {
        RECIPES.RECIPES.push(recipe);
        RECIPES.RECIPES_IDS.push(recipe.id);
        makeOptionList(recipe, LIST_ARRAY.INGREDIENTS, LIST_ARRAY.APPAREILS, LIST_ARRAY.USTENSILS);
        const recipeModel = recipeFactory(recipe, article);
        const recipeDOM = recipeModel.getRecipeDOM();
        DOM.RECIPES_SECTION.insertAdjacentHTML('beforeend', recipeDOM);
    });
    addOptionInDataList(LIST_ARRAY.INGREDIENTS, LIST_ARRAY.APPAREILS, LIST_ARRAY.USTENSILS);
    const DATALIST_OPTIONS = document.querySelectorAll('.datalist option');
    initFilters(DATALIST_OPTIONS);
    
    DOM.SEARCH_INPUT.addEventListener('input', () => {
        search();
    });

  }


/*
Initialisation.
*/
async function init() {
    // We start getting the data
    const { recipes } = await getRecipes();
    const article = await getTemplate();
    displayData(recipes, article);
}

export default init;