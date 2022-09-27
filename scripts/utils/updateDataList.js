import { DOM, DOM_FILTERS, RECIPES } from './const.js';
import { makeOptionList } from '../utils/dataList.js';

/*
This function update the filter's list after search execution to remove or add option. 
*/
function updateDataList(recipesIDS) {
    var ingrArr = [];
    var appArr = [];
    var ustArr = [];
    var ingr = [...DOM.TAGS_SECTION.querySelectorAll('.tag-ingredients')].map(tag => tag.innerText.toLowerCase());
    var appareils = [...DOM.TAGS_SECTION.querySelectorAll('.tag-appareils')].map(tag => tag.innerText.toLowerCase());
    var ustensils = [...DOM.TAGS_SECTION.querySelectorAll('.tag-ustensils')].map(tag => tag.innerText.toLowerCase());
    RECIPES.RECIPES.forEach(recipe => {
        if (recipesIDS.indexOf(recipe.id) > -1) {
            makeOptionList(recipe, ingrArr, appArr, ustArr);
        }
    });

    var ingrData = DOM_FILTERS.INGREDIENTS.querySelectorAll('option');
    var appData = DOM_FILTERS.APPAREILS.querySelectorAll('option');
    var ustData  = DOM_FILTERS.USTENSILS.querySelectorAll('option');
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

export default updateDataList;