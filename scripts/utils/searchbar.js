import { RECIPES, RECIPES_IDS, TAGS_SECTION } from './const.js';
// TAGS SEARCH

let allRecipesIDS = RECIPES_IDS;
let recipesIDSReturned = [];

let ingredientsTags = [];
let appareilsTags = [];
let ustensilsTags = [];

function search() {
    tagSearch();

    

}

function tagSearch() {
    var tagsIngredients = TAGS_SECTION.querySelectorAll('.tag-ingredients');
    var tagsUstensils = TAGS_SECTION.querySelectorAll('.tag-ustensils');
    var tagsAppareils = TAGS_SECTION.querySelectorAll('.tag-appareils');

    RECIPES.forEach((recipe) => {
        if (tagsIngredients != '') {
            var isMatch = isMatchingWithRecipe(tagsIngredients, recipe);
            if (isMatch) {
                recipesIDSReturned.push(recipe.id);
            }
        }
        if (match) {
            recipesIDSReturned.push(recipe.id);
        }
    });

}

function isMatchingWithRecipe(array) {
    return true;
}
/*

On récupère toutes les recettes et un array qui contient tous les ids de recettes.

On crée un nouvel array qui contiendra les nouveaux ids.

Lorsqu'on clique sur une option on regarde la liste des tags posés.
Pour chaque tag on regarde son type.
On boucle sur Recipes en fonction du type de tag. Si on trouve la valeur du tag alors on renvoie l'id dans le nouvel array.
On renvoie l'array avec les ids correspondant, on masque les autres.


Lorsqu'on clique sur la croix, on refait une passe sur la section tag.
Quand il n'y a pas de tag dans la section on ne fait rien.
*/