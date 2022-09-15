import { FILTER_INGREDIENTS, FILTER_APPAREILS, FILTER_USTENSILS } from './const.js';
import  createOption from '../utils/createDatalistOption.js';
function addOptionInDataList(ingredientsArray, appareilsArray, ustensilsArray) {
    ingredientsArray.forEach((ingredient) => {
       const option = createOption(ingredient);
       FILTER_INGREDIENTS.insertAdjacentElement('beforeend', option);
    });
    appareilsArray.forEach((index) => {
      const option = createOption(index);
      FILTER_APPAREILS.insertAdjacentElement('beforeend', option);
    });
    ustensilsArray.forEach((index) => {
      const option = createOption(index);
      FILTER_USTENSILS.insertAdjacentElement('beforeend', option);
    });
}

export default addOptionInDataList;