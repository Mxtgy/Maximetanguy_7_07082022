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

export default makeOptionList;