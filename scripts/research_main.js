import { recipes } from "./data/recipes.js";
import { displayData } from "./index.js";
import { createDropdownOptions, deleteAllDropdownOptions, displayHideDropdownOptions } from "./research_tag.js"

function mainResearch() {
    const searchBar = document.querySelector('.form-control')
    const cardsContainer = document.querySelector('.card-deck')
    const groupButtons = document.querySelector('.btn-group')

    searchBar.addEventListener('input', function () {
        let recipesFromSearchBar = []
        if (this.value.length > 2) {
            for (let i = 0; i < recipes.length; i++) {

                let actualRecipe = recipes[i]
                // Search for name 
                if (actualRecipe.name.toLowerCase().includes(this.value) || actualRecipe.name.toUpperCase().includes(this.value) || actualRecipe.name.includes(this.value)) {
                    recipesFromSearchBar.push(actualRecipe)
                }
                // Search for description
                else if (actualRecipe.description.toLowerCase().includes(this.value) || actualRecipe.description.toUpperCase().includes(this.value) || actualRecipe.description.includes(this.value)) {
                    recipesFromSearchBar.push(actualRecipe)
                } 
                else {
                    // Search for ingredient
                    for (let a = 0; a < actualRecipe.ingredients.length ; a++) {
                        let actualIngredient = actualRecipe.ingredients[a]

                        if (actualIngredient.ingredient.toLowerCase().includes(this.value) || actualIngredient.ingredient.toUpperCase().includes(this.value) || actualIngredient.ingredient.includes(this.value)) {
                            recipesFromSearchBar.push(actualRecipe)
                        }
                    }
                }
            }
            cardsContainer.innerHTML = ''
            if (recipesFromSearchBar.length > 0 ) {
                displayData(recipesFromSearchBar)
                deleteAllDropdownOptions()
                createDropdownOptions(recipesFromSearchBar)
                removeMsgNoResult()
            }
            else {
                groupButtons.after(createMsgNoResult())
            }
        }
        else {
            cardsContainer.innerHTML = ''
            displayData(recipes)
            deleteAllDropdownOptions()
            createDropdownOptions(recipes)
            removeMsgNoResult()
        }
    })
    searchBar.addEventListener('click', function(){
        const allFilterButtons = document.querySelectorAll('.filter-button')

        allFilterButtons.forEach(button => {
        let searchInputTag = document.getElementById('searchInput' + button.name)

            if (button.classList.contains('active')) {
                button.classList.remove('active')
                searchInputTag.classList.remove('active')
                displayHideDropdownOptions(button, 'none')
            }
        })
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
