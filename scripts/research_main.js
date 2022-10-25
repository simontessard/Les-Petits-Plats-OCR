import { recipes } from "./data/recipes.js";
import { displayData } from "./index.js";
import { displayDropdownOptions } from "./research_tag.js"

function mainResearch() {
    const searchBar = document.querySelector('.form-control')
    const cardsContainer = document.querySelector('.card-deck')
    const groupButtons = document.querySelector('.btn-group')
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
            if (recipesFromSearchBar.length >0 ) {
                displayData(recipesFromSearchBar)
                removeMsgNoResult()
            }
            else {
                groupButtons.after(createMsgNoResult())
            }
            // displayDropdownOptions(recipesFromSearchBar)
        }
        else {
            cardsContainer.innerHTML = ''
            displayData(recipes)
            // displayDropdownOptions(recipes)
            removeMsgNoResult()
        }
    })
}

function createMsgNoResult() {
    removeMsgNoResult()
    const msgNoResult = document.createElement('p')
    msgNoResult.textContent = 'Aucun résultat trouvé'
    msgNoResult.setAttribute('class', 'msgNoResult')
    return msgNoResult
}

function removeMsgNoResult() {
    const msgNoResult = document.querySelector('.msgNoResult')
    if (msgNoResult != null) {
        msgNoResult.remove()
    }
}

export { mainResearch }
