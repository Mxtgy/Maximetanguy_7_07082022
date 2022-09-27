import { DOM, RECIPES } from './const.js';

/*
This function initiate the search of the accurate type of tags and return the recipes ids
*/
function checkTags(recipesIDS, tagType) {
    if (!recipesIDS || recipesIDS.length == 0) {
        return false;
    }
    var tagValues = [];
    switch (tagType) {
        case "INGREDIENTS":
            tagValues = [...DOM.TAGS_SECTION.querySelectorAll('.tag-ingredients')].map(tag => tag.innerText.toLowerCase());
            
            if (tagValues.length > 0) {
                return recipesIDS = checkValuesIngredients(tagValues, recipesIDS);
            }
            break;
        case "APPAREILS":
            tagValues = [...DOM.TAGS_SECTION.querySelectorAll('.tag-appareils')].map(tag => tag.innerText.toLowerCase());

            if (tagValues.length > 0) {
                return recipesIDS = checkValuesAppareils(tagValues, recipesIDS);
            }
            break;
        case "USTENSILS":
            tagValues = [...DOM.TAGS_SECTION.querySelectorAll('.tag-ustensils')].map(tag => tag.innerText.toLowerCase());
            
            if (tagValues.length > 0) {
                return recipesIDS = checkValuesUstensils(tagValues, recipesIDS);
            }
            break;
        default:
            console.log('err');
            break;
    }

    return recipesIDS;
}

/*
Those 3 next functions search for the tags values in the recipes and return the recipes ids
*/
function checkValuesIngredients(tagValues, recipesIDS) {
    var recipesFound = [];
    RECIPES.RECIPES.forEach(recipe => {
        var matchFound = false;
        const ingredients = recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase());

        tagValues.every(tag => {
            if (ingredients.indexOf(tag) > -1) {
                matchFound = true;
                return true;
            }
            return matchFound = false;
        });

        if (matchFound && recipesIDS.indexOf(recipe.id) > -1 ) {
            recipesFound.push(recipe.id);
        }

    });

    if (recipesFound.length > 0) {
        return recipesFound;
    }

    return false;
}

function checkValuesUstensils(tagValues, recipesIDS) {
    var recipesFound = [];
    RECIPES.RECIPES.forEach(recipe => {
        var matchFound = false;
        const ustensils = recipe.ustensils.map(ust => ust.toLowerCase());

        tagValues.every(tag => {
            if (ustensils.indexOf(tag) > -1) {
                matchFound = true;
                return true;
            }
            return matchFound = false;
        });

        if (matchFound && recipesIDS.indexOf(recipe.id) > -1) {
            recipesFound.push(recipe.id);
        }
    });

    if (recipesFound.length > 0) {
        return recipesFound;
    }
    return false;

}

function checkValuesAppareils(tagValues, recipesIDS) {
    var recipesFound = [];
    RECIPES.RECIPES.forEach(recipe => {
        var matchFound = false;
        const appareils = recipe.appliance.toLowerCase();

        tagValues.every(tag => {
            if (appareils.indexOf(tag) > -1) {
                matchFound = true;
                return true;
            }
            return matchFound = false;
        });

        if (matchFound && recipesIDS.indexOf(recipe.id) > -1 ) {
            recipesFound.push(recipe.id);
        }
    });

    if (recipesFound.length > 0) {
        return recipesFound;
    }
    return false;

}

export default checkTags;