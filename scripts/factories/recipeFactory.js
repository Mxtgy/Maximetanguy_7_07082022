function recipeFactory(data, article) {
  
  /*
  Function that create the element.
  */
  function getRecipeDOM() {
    var source = article;
    var template = Handlebars.compile(source);
    var html = template(data);
  
    return (html);
  }
    return { getRecipeDOM };
}

export default recipeFactory;