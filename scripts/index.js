import { recipeFactory } from "./factories/recipe.js";

async function getRecipes() {
    return fetch('scripts/data/recipes.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
          console.log(data)
            return ({ recipes: [...data.recipes] })
        })
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
    // Récupère les datas des photographes
    const { recipes } = await getRecipes() || {}

    if (typeof recipes !== 'undefined') {
      displayData(recipes)
    }
  };
  
init()