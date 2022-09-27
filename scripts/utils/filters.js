import { DOM } from './const.js';
import search from './searchbar.js';

/*
This function toggle the list on the accurate filter
*/
function toggleFilter(parentFilter) {
    parentFilter.classList.toggle('active');
}

/*
This function initiate the display of the list on the accurate filter 
*/
function initList(e) {
    var targetInput = e.target;
    var parentFilter = targetInput.parentElement;
    toggleFilter(parentFilter);
}

/*
This function display the options matching the user input and hide the rest
*/
function searchInInput(e) {
    var elem = e.target;
    var parentElement = elem.parentElement;
    var value = elem.value.toUpperCase();
    var list = parentElement.querySelectorAll('.datalist option');
    for (var p = 0; p < list.length; p++) {
        if (list[p].value.toUpperCase().indexOf(value) > -1) {
            list[p].style.display = 'block';
        } else {
            list[p].style.display = 'none';
        }
    }
}

/*
This function initiate the tag creation, the hide of the option clicked,
insert the tag into the tag section and add a listener on it.
*/
function clickOnOption(e) {
    var option = e.target;
    var optionDataParent = option.parentElement;
    const tag = createTag(option, optionDataParent);
    removeOptionFromList(option);
    DOM.TAGS_SECTION.insertAdjacentElement('afterbegin', tag);
    search();
    tag.addEventListener('click', (e) => {
        addOptionBackInList(e);
    });
}

/*
This function create tag and return the HTML
*/
function createTag(option, optionDataParent) {
    var optionValue = option.value;
    var optionHTML = document.createElement('span');
    optionHTML.classList.add('tag');
    optionHTML.innerText = optionValue;
    switch (optionDataParent.id) {
        case "data-ingredients":
            optionHTML.classList.add('tag-ingredients');
            break;
        case "data-appareils":
            optionHTML.classList.add('tag-appareils');
            break;
        case "data-ustensils":
            optionHTML.classList.add('tag-ustensils');
            break;
        default:
            break;
    }

    return optionHTML;

}

/*
This function hide the option clicked from the datalist
*/
function removeOptionFromList(option) {
    option.classList.add('option-none');
}

/*
This function purpose is to look through the datalist and display back the option,
to remove the tag from the tag section
*/
function addOptionBackInList(option) {
    var datalist_options = document.querySelectorAll('.datalist option');
    var optionInList = option.target.innerText;
    for (var a = 0; a < datalist_options.length; a++) {
        if (datalist_options[a].value === optionInList) {
            datalist_options[a].classList.remove('option-none');
        }
    }
    option.target.remove();
    search();
}

function initFilters(DATALIST_OPTIONS) {

    // Events added on the filters inputs for the focus, focusout and typing in
    for (var i = 0; i < DOM.FILTERS_INPUT.length; i++) {
        DOM.FILTERS_INPUT[i].addEventListener('focus', (e) => {
            initList(e);
        });
        
        DOM.FILTERS_INPUT[i].addEventListener('focusout', (e) => {
                var targetInput = e.target;
                var parentFilter = targetInput.parentElement;
                toggleFilter(parentFilter);
                targetInput.value = '';
                searchInInput(e);
        });
    
        DOM.FILTERS_INPUT[i].addEventListener('input', (e) => {
            searchInInput(e);
        });
    
    }

    // Click event on option in datalist
    for (var u = 0; u < DATALIST_OPTIONS.length; u++) {
        DATALIST_OPTIONS[u].addEventListener('mousedown', (e) => {
            clickOnOption(e);
        });
    }
}

export default initFilters;