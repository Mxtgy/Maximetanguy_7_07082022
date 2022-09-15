function createOption(value) {
    var optionElem = document.createElement('option');
    optionElem.value = value;
    optionElem.innerText = value;

    return optionElem;
}
export default createOption;