import { recipeFactory } from "./factories/recipe.js";
import { recipes } from "./data/recipes.js";

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
    if (typeof recipes !== 'undefined') {
      displayData(recipes)
    }
  };
  
init()