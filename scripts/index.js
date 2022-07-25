import { recipeFactory } from "./factories/recipe.js";
import { recipes } from "./data/recipes.js";
import { displayDropdownOptions } from "./research_tag.js"
import { filterButtonFactory, createFilterButton } from "./factories/filterButton.js";

function getIngredients(recipes) {
  let ingredientsData =  recipes.map(s=>s.ingredients);
  let allIngredients = []

  ingredientsData.forEach(ingredientsRecipe => 
    ingredientsRecipe.forEach(ingredient => 
      allIngredients.push(ingredient.ingredient))
  );
  
  // Removes duplicates from the list
  const filteredIngredients = allIngredients.filter(function(ele , pos){
    return allIngredients.indexOf(ele) == pos;
  })

  return filteredIngredients
}

function getAppareils(recipes) {
  let appareilsData =  recipes.map(s=>s.appliance);
  
  // Removes duplicates from the list
  appareilsData = appareilsData.filter(function(ele , pos){
    return appareilsData.indexOf(ele) == pos;
  })

  return appareilsData
}

async function displayData (recipes) {
    const recipesSection = document.querySelector('#recipes-cards')
    recipesSection.setAttribute('class','card-deck mt-4 px-5')
  
    if (typeof recipes !== 'undefined') {
        recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe)
        const recipeCardDOM = recipeModel.getRecipeCardDOM()
        const col = document.createElement('div')
        col.setAttribute('class','col-sm-4 p-0 mb-4')
          
        recipesSection.appendChild(col)
        col.appendChild(recipeCardDOM)
      })
    }
  };

async function init () {
  // Initialise les données recettes
  displayData(recipes)
  createFilterButton()
  displayDropdownOptions(recipes)
};
  
init()

export { getAppareils, getIngredients }