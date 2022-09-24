import { SEARCH_INPUT, RECIPES_SECTION, NO_RECIPE, RECIPES, RECIPES_IDS, TAGS_SECTION, TAGS_INGREDIENTS, TAGS_USTENSILS, TAGS_APPAREILS, FILTER_INGREDIENTS, FILTER_APPAREILS, FILTER_USTENSILS } from './const.js';
import makeOptionList from '../utils/makeOptionList.js';


function search() {
    var recipesDOM = RECIPES_SECTION.querySelectorAll('article');
    var arrayIDS = RECIPES_IDS;
    arrayIDS = checkTags(arrayIDS, TAGS_INGREDIENTS);
    arrayIDS = checkTags(arrayIDS, TAGS_APPAREILS);
    arrayIDS = checkTags(arrayIDS, TAGS_USTENSILS);
    arrayIDS = checkSearchBar2(arrayIDS);

    updateRecipeListInDOM(arrayIDS, recipesDOM);
    updateDataList(arrayIDS);

}

function updateRecipeListInDOM(arrayIDS, recipesDOM) {
    NO_RECIPE.classList.remove('is-visible');
    if (!arrayIDS || arrayIDS.length < 1) {
        // AFFICHAGE NO RESULTS

        NO_RECIPE.classList.add('is-visible');
        for (var i = 0; i < recipesDOM.length; i++) {
            recipesDOM[i].style.display = 'none';
        }
        return;
    }
    
    for (var j = 0; j < recipesDOM.length; j++) {        
        if (arrayIDS.indexOf(parseInt(recipesDOM[j].id)) > -1) {
            recipesDOM[j].style.display = 'flex';
            continue;
        }
        recipesDOM[j].style.display = 'none';
        
    }

}

function updateDataList(arrayIDS) {
    var ingrArr = [];
    var appArr = [];
    var ustArr = [];
    var ingr = [...TAGS_SECTION.querySelectorAll('.tag-ingredients')].map(tag => tag.innerText.toLowerCase());
    var appareils = [...TAGS_SECTION.querySelectorAll('.tag-appareils')].map(tag => tag.innerText.toLowerCase());
    var ustensils = [...TAGS_SECTION.querySelectorAll('.tag-ustensils')].map(tag => tag.innerText.toLowerCase());
    RECIPES.forEach(recipe => {
        if (arrayIDS.indexOf(recipe.id) > -1) {
            makeOptionList(recipe, ingrArr, appArr, ustArr);
        }
    });

    var ingrData = FILTER_INGREDIENTS.querySelectorAll('option');
    var appData = FILTER_APPAREILS.querySelectorAll('option');
    var ustData  = FILTER_USTENSILS.querySelectorAll('option');
    for (var k = 0; k < ingrData.length; k++) {
        if (ingrArr.indexOf(ingrData[k].value.toLowerCase()) > -1 && ingr.indexOf(ingrData[k].value.toLowerCase()) < 0) {
            ingrData[k].classList.remove('option-none');
            continue;
        }
        ingrData[k].classList.add('option-none');
    }

    for (var l = 0; l < appData.length; l++) {
        if (appArr.indexOf(appData[l].value.toLowerCase()) > -1 && appareils.indexOf(appData[l].value.toLowerCase()) < 0) {
            appData[l].classList.remove('option-none');
            continue;
        }
        appData[l].classList.add('option-none');
    }

    for (var m = 0; m < ustData.length; m++) {
        if (ustArr.indexOf(ustData[m].value.toLowerCase()) > -1 && ustensils.indexOf(ustData[m].value.toLowerCase()) < 0) {
            ustData[m].classList.remove('option-none');
            continue;
        }
        ustData[m].classList.add('option-none');
    }
}

function checkTags(arrayIDS, tagType) {
    if (!arrayIDS || arrayIDS.length == 0) {
        return false;
    }
    var tagValues = [];
    switch (tagType) {
        case "INGREDIENTS":
            tagValues = [...TAGS_SECTION.querySelectorAll('.tag-ingredients')].map(tag => tag.innerText.toLowerCase());
            
            if (tagValues.length > 0) {
                return arrayIDS = checkValuesIngredients(tagValues, arrayIDS);
            }
            break;
        case "APPAREILS":
            tagValues = [...TAGS_SECTION.querySelectorAll('.tag-appareils')].map(tag => tag.innerText.toLowerCase());

            if (tagValues.length > 0) {
                return arrayIDS = checkValuesAppareils(tagValues, arrayIDS);
            }
            break;
        case "USTENSILS":
            tagValues = [...TAGS_SECTION.querySelectorAll('.tag-ustensils')].map(tag => tag.innerText.toLowerCase());
            
            if (tagValues.length > 0) {
                return arrayIDS = checkValuesUstensils(tagValues, arrayIDS);
            }
            break;
        default:
            console.log('err');
            break;
    }

    return arrayIDS;
}

function checkValuesIngredients(tagValues, arrayIDS) {
    var recipesFound = [];
    RECIPES.forEach(recipe => {
        var matchFound = false;
        const arp = recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase());

        tagValues.every(tag => {
            if (arp.indexOf(tag) > -1) {
                matchFound = true;
                return true;
            }
            return matchFound = false;
        });

        if (matchFound && arrayIDS.indexOf(recipe.id) > -1 ) {
            recipesFound.push(recipe.id);
        }

    });

    if (recipesFound.length > 0) {
        return recipesFound;
    }

    return false;
}

function checkValuesUstensils(tagValues, arrayIDS) {
    var recipesFound = [];
    RECIPES.forEach(recipe => {
        var matchFound = false;
        const ust = recipe.ustensils.map(ust => ust.toLowerCase());

        tagValues.every(tag => {
            if (ust.indexOf(tag) > -1) {
                matchFound = true;
                return true;
            }
            return matchFound = false;
        });

        if (matchFound && arrayIDS.indexOf(recipe.id) > -1) {
            recipesFound.push(recipe.id);
        }
    });

    if (recipesFound.length > 0) {
        return recipesFound;
    }
    return false;

}

function checkValuesAppareils(tagValues, arrayIDS) {
    var recipesFound = [];
    RECIPES.forEach(recipe => {
        var matchFound = false;
        const appareils = recipe.appliance.toLowerCase();

        tagValues.every(tag => {
            if (appareils.indexOf(tag) > -1) {
                matchFound = true;
                return true;
            }
            return matchFound = false;
        });

        if (matchFound && arrayIDS.indexOf(recipe.id) > -1 ) {
            recipesFound.push(recipe.id);
        }
    });

    if (recipesFound.length > 0) {
        return recipesFound;
    }
    return false;

}

function checkSearchBar(arrayIDS) {
    var value = SEARCH_INPUT.value.toLowerCase();
    var recipesFound = [];
    if (!arrayIDS || arrayIDS.length == 0) {
        return false;
    }
    if (value.length < 3) {
        return arrayIDS; 
    }

    /*const recipesFound = RECIPES.filter(recipe => {
        return recipe.name.toLowerCase().indexOf(value) > -1 || recipe.description.toLowerCase().indexOf(value) > -1 || recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase()).find(ing => ing.indexOf(value) > -1);
    }).map(recipe => recipe.id);*/
    
    RECIPES.forEach(recipe => {
        if (arrayIDS.indexOf(recipe.id) > -1) {

            var matchFound = false;

            const ingr = recipe.ingredients.map(ingr => ingr.ingredient.toLowerCase());
            const some1 = (element) => element.indexOf(value) > -1;
            
            if (arrayIDS.indexOf(recipe.id) > -1 && (recipe.name.toLowerCase().indexOf(value) > -1 || recipe.description.toLowerCase().indexOf(value) > -1 || ingr.some(some1))) {
                matchFound = true;
            }
        

            /*ingr.every(ingredient => {
                if (ingredient.indexOf(value) > -1) {
                    matchFound = true;
                    return false;
                }
            });

            if (matchFound && arrayIDS.indexOf(recipe.id) > -1) {
                recipesFound.push(recipe.id);
            }*/
            if (matchFound) {
                recipesFound.push(recipe.id);
            }
        }
    });
    console.log(recipesFound);
    return recipesFound;

}

function checkSearchBar2(arrayIDS) {
    var value = SEARCH_INPUT.value.toLowerCase();
    var recipesFound = [];
    if (!arrayIDS || arrayIDS.length == 0) {
        return false;
    }
    if (value.length < 3) {
        return arrayIDS;
    }

    for (var i = 0; i < RECIPES.length; i++) {
        var recipe = RECIPES[i];
        var matchFound = false;
        var ingredients = [];

        if (arrayIDS.indexOf(recipe.id) === -1) {
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

        if (matchFound && arrayIDS.indexOf(recipe.id) > -1) {
            recipesFound.push(recipe.id);
        }

    }

    return recipesFound;

}

export default search;