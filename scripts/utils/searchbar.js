import { DOM, RECIPES, TAGS } from './const.js';
import checkTags from '../utils/checkTags.js';
import updateDataList from '../utils/updateDataList.js';

/*
Initiate the search.
*/
function search() {
    var recipesDOM = DOM.RECIPES_SECTION.querySelectorAll('article');
    var recipesIDS = RECIPES.RECIPES_IDS;
    recipesIDS = checkTags(recipesIDS, TAGS.INGREDIENTS);
    recipesIDS = checkTags(recipesIDS, TAGS.APPAREILS);
    recipesIDS = checkTags(recipesIDS, TAGS.USTENSILS);
    recipesIDS = checkSearchBar(recipesIDS);

    updateRecipeListInDOM(recipesIDS, recipesDOM);
    updateDataList(recipesIDS);

}

/*
This function is updating the recipes list in the DOM according to
the search results.
*/
function updateRecipeListInDOM(recipesIDS, recipesDOM) {
    DOM.NO_RECIPE.classList.remove('is-visible');
    if (!recipesIDS || recipesIDS.length < 1) {

        DOM.NO_RECIPE.classList.add('is-visible');
        for (var i = 0; i < recipesDOM.length; i++) {
            recipesDOM[i].style.display = 'none';
        }
        return;
    }
    
    for (var j = 0; j < recipesDOM.length; j++) {        
        if (recipesIDS.indexOf(parseInt(recipesDOM[j].id)) > -1) {
            recipesDOM[j].style.display = 'flex';
            continue;
        }
        recipesDOM[j].style.display = 'none';
        
    }

}

/*
This function search a match in the recipes with the value entered in the searchbar
*/
function checkSearchBar(recipesIDS) {
    var value = DOM.SEARCH_INPUT.value.toLowerCase();
    var recipesFound = [];

    if (!recipesIDS || recipesIDS.length == 0) {
        return false;
    }

    if (value.length < 3) {
        return recipesIDS;
    }

    for (var i = 0; i < RECIPES.RECIPES.length; i++) {
        var recipe = RECIPES.RECIPES[i];
        var matchFound = false;
        var ingredients = [];

        if (recipesIDS.indexOf(recipe.id) === -1) {
            continue;
        }

        for (var n = 0; n < recipe.ingredients.length; n++) {
            ingredients.push(recipe.ingredients[n].ingredient.toLowerCase());
        }

        if (recipe.name.toLowerCase().indexOf(value) > -1 || recipe.description.toLowerCase().indexOf(value) > -1) {
            matchFound = true;
        }

        for (var p = 0; p < ingredients.length; p++) {
            if (ingredients[p].indexOf(value) > -1) {
                matchFound = true;
                break;
            }
        }

        if (matchFound) {
            recipesFound.push(recipe.id);
        }

    }
    
    return recipesFound;

}

export default search;