/* DOM ELEMENTS */
export const DOM = {
    SEARCH_INPUT: document.querySelector('#js-search-input'),
    FILTERS_INPUT: document.querySelectorAll('.filter-input'),
    TAGS_SECTION: document.querySelector('.tags-section'),
    RECIPES_SECTION: document.querySelector('.recipes-list'),
    NO_RECIPE: document.querySelector('.no-recipe')
}

export const DOM_FILTERS = {
    INGREDIENTS: document.querySelector('.data-ingredients'),
    APPAREILS: document.querySelector('.data-appareils'),
    USTENSILS: document.querySelector('.data-ustensils')
}

/* TAGS TYPE */
export const TAGS = {
    INGREDIENTS: "INGREDIENTS",
    APPAREILS: "APPAREILS",
    USTENSILS: "USTENSILS"
}

/* ARRAYS TO STOCK DATA */
export const LIST_ARRAY = {
    INGREDIENTS: [],
    APPAREILS: [],
    USTENSILS: []
}

export const RECIPES = {
    RECIPES: [],
    RECIPES_IDS: []
}