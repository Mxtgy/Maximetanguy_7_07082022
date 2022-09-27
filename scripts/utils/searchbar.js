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

    /* 
    CODE PEU PERFORMANT MAIS COURT
    ======================================================
    const RECIPES2 = RECIPES.filter(recipe => arrayIDS.indexOf(recipe.id) > -1);
    const recipesFound = RECIPES2.filter(recipe => {
        return recipe.name.toLowerCase().indexOf(value) > -1 || recipe.description.toLowerCase().indexOf(value) > -1 || recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase()).find(ing => ing.indexOf(value) > -1);
    }).map(recipe => recipe.id);
    ======================================================
    */
    
    RECIPES.RECIPES.forEach(recipe => {
        if (recipesIDS.indexOf(recipe.id) > -1) {
            var matchFound = false;
            const ingr = recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase());

            /* CODE ASSEZ PERFORMANT
            ======================================================
            const some1 = (element) => element.indexOf(value) > -1;
            if (ingr.some(some1)) {
                matchFound = true;
            }
            ======================================================
            */

            if (recipe.name.toLowerCase().indexOf(value) > -1 || recipe.description.toLowerCase().indexOf(value) > -1) {
                matchFound = true;
            }

            ingr.every(ingredient => {
                if (ingredient.indexOf(value) > -1) {
                    matchFound = true;
                    return false;
                }
            });

            if (matchFound) {
                recipesFound.push(recipe.id);
            }

        }
    });

    return recipesFound;

}

export default search;