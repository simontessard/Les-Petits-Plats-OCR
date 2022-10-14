import { recipes } from "./data/recipes.js";
import { displayData } from "./index.js";
import { displayDropdownOptions } from "./research_tag.js"

function mainResearch() {
    const searchBar = document.querySelector('.form-control')
    const cardsContainer = document.querySelector('.card-deck')
    // const allCards = document.getElementsByClassName('card')

    searchBar.addEventListener('input', function () {
        let recipesFromSearchBar = []
        if (this.value.length > 2) {
            for (let i = 0; i < recipes.length; i++) {

                let actualRecipe = recipes[i]

                if (actualRecipe.name.toLowerCase().includes(this.value) || actualRecipe.name.toUpperCase().includes(this.value) || actualRecipe.name.includes(this.value)) {
                    recipesFromSearchBar.push(actualRecipe)
                }
                else if (actualRecipe.description.toLowerCase().includes(this.value) || actualRecipe.description.toUpperCase().includes(this.value) || actualRecipe.description.includes(this.value)) {
                    recipesFromSearchBar.push(actualRecipe)
                }
                else {
                    actualRecipe.ingredients.forEach(ingredient => {
                        if (ingredient.ingredient.toLowerCase().includes(this.value) || ingredient.ingredient.toUpperCase().includes(this.value) || ingredient.ingredient.includes(this.value)) {
                            recipesFromSearchBar.push(actualRecipe)
                        }
                    });
                }
            }
            cardsContainer.innerHTML = ''
            displayData(recipesFromSearchBar)
            displayDropdownOptions(recipesFromSearchBar)
        }
        else {
            cardsContainer.innerHTML = ''
            displayData(recipes)
            displayDropdownOptions(recipes)
        }
    })
}

export { mainResearch }
