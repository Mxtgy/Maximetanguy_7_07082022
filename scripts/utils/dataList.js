import { DOM_FILTERS } from './const.js';

/*
This function create an option to be add in the filter's list
*/
function createOption(value) {
    var optionElem = document.createElement('option');
    optionElem.value = value;
    optionElem.innerText = value;

    return optionElem;
}

/*
This function insert option element in the filter's list 
*/
function addOptionInDataList(ingredientsArray, appareilsArray, ustensilsArray) {
    ingredientsArray.forEach((ingredient) => {
       const option = createOption(ingredient);
       DOM_FILTERS.INGREDIENTS.insertAdjacentElement('beforeend', option);
    });
    appareilsArray.forEach((index) => {
      const option = createOption(index);
      DOM_FILTERS.APPAREILS.insertAdjacentElement('beforeend', option);
    });
    ustensilsArray.forEach((index) => {
      const option = createOption(index);
      DOM_FILTERS.USTENSILS.insertAdjacentElement('beforeend', option);
    });
}

/*
This function create the list by pushing tags values in it if it's not already in
*/
function makeOptionList(recipe, ingredients, appareils, ustensils) {
    if (appareils.indexOf(recipe.appliance.toLowerCase()) < 0) {
        appareils.push(recipe.appliance.toLowerCase());
    }
    recipe.ustensils.forEach((ustensil) => {
        if (ustensils.indexOf(ustensil.toLowerCase()) < 0) {
          ustensils.push(ustensil.toLowerCase());
        }
    });
    recipe.ingredients.forEach((objIngredient) => {
      if (ingredients.indexOf(objIngredient.ingredient.toLowerCase()) < 0) {
        ingredients.push(objIngredient.ingredient.toLowerCase());
      }
  });
}

export { createOption, addOptionInDataList, makeOptionList } ;