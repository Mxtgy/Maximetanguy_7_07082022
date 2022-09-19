import { SEARCH_INPUT, RECIPES_SECTION, RECIPES, RECIPES_IDS, INGREDIENTS_ARRAY, APPAREILS_ARRAY, USTENSILS_ARRAY } from '../utils/const.js';
import recipeFactory from '../factories/recipeFactory.js';
import addOptionInDataList from '../utils/addOptionInDataList.js';
import makeOptionList from '../utils/makeOptionList.js';
import initFilters from '../utils/filters.js';
import search from '../utils/searchbar.js';

/*
This function return the photographers data.
*/
async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const recipes = await response.json();
  
    return { recipes: recipes.recipes };
}

async function getTemplate() {
    const response = await fetch('./template/article.hbs');
    const article = await response.text();

    return article;
} 

  /*
  This function will launch the factory and add the element in the DOM.
  */
  async function displayData(recipes, article) {
    
    recipes.forEach((recipe) => {
        RECIPES.push(recipe);
        RECIPES_IDS.push(recipe.id);
        makeOptionList(recipe, INGREDIENTS_ARRAY, APPAREILS_ARRAY, USTENSILS_ARRAY);
        const recipeModel = recipeFactory(recipe, article);
        const recipeDOM = recipeModel.getRecipeDOM();
        RECIPES_SECTION.insertAdjacentHTML('beforeend', recipeDOM);
    });
    addOptionInDataList(INGREDIENTS_ARRAY, APPAREILS_ARRAY, USTENSILS_ARRAY);
    const DATALIST_OPTIONS = document.querySelectorAll('.datalist option');
    initFilters(DATALIST_OPTIONS);
    
    SEARCH_INPUT.addEventListener('input', () => {
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