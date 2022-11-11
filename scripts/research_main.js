import { recipes } from "./data/recipes.js";
import { displayData } from "./index.js";
import { createDropdownOptions, deleteAllDropdownOptions, displayHideDropdownOptions, getRecipesFromMultiplesTags } from "./research_tag.js"

let recipesFromSearch = recipes
let filtersArray = []

function mainResearch() {
    const searchBar = document.querySelector('.form-control')
    const cardsContainer = document.querySelector('.card-deck')
    const groupButtons = document.querySelector('.btn-group')

    searchBar.addEventListener('input', function () {
        console.log(recipesFromSearch)
        if (this.value.length > 2) {
            recipesFromSearch = []
            if (filtersArray.length > 0) {
                recipesFromSearch = getRecipesFromOneTag(getRecipesFromMultiplesTags(filtersArray), this.value)
            }
            else { // Main research only (without any tag)
                recipesFromSearch = getRecipesFromOneTag(recipes, this.value)
            }
            if (recipesFromSearch.length > 0) {
                updateUI(recipesFromSearch)
            }
            else {
                cardsContainer.innerHTML = ''
                groupButtons.after(createMsgNoResult())
            }
        }
        else if (this.value.length == 0) {
            if (filtersArray.length > 0) {
                recipesFromSearch = getRecipesFromMultiplesTags(filtersArray)
                updateUI(recipesFromSearch)
            }
            else { 
                updateUI(recipes)
                recipesFromSearch = recipes
            }
        }
    })
    searchBar.addEventListener('click', function () {
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
    let noResult = []
    removeMsgNoResult()
    deleteAllDropdownOptions()
    createDropdownOptions(noResult)
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

function updateUI(result) {
    const cardsContainer = document.querySelector('.card-deck')
    cardsContainer.innerHTML = ''
    displayData(result)
    deleteAllDropdownOptions()
    createDropdownOptions(result)
    removeMsgNoResult()
}

function setRecipesFromSearchBar(res) {
    recipesFromSearch = res
    updateUI(recipesFromSearch)
}

function removeItemFromFilterArray(tag) {
    // Remove the tag deleted from the array of all the tags
    filtersArray = filtersArray.filter(function (e) { return e !== tag })
}

function getMainSearchTag() {
    let mainSearchTag = document.getElementById("mainSearchTag").value
    return mainSearchTag
}

function getRecipesFromOneTag(recipes, tag) {
    let recipesFromOneTag = []
    tag = tag.toLowerCase()

    recipes.forEach(recipe => {
        // Search for name 
        if (recipe.name.toLowerCase().includes(tag) 
        || recipe.description.toLowerCase().includes(tag) 
        || recipe.appliance.toLowerCase().includes(tag)) {
            recipesFromOneTag.push(recipe)
        }
        else {
            // Search for ingredient
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase().includes(tag)) {
                    recipesFromOneTag.push(recipe)
                }
            })
            // Search for ustensils
            recipe.ustensils.forEach(ustensil => {
                if (ustensil === undefined) {
                    if (ustensil.ingredient.toLowerCase().includes(tag)) {
                        recipesFromOneTag.push(recipe)
                    }
                }
            })
        }
    })
    return recipesFromOneTag
}

export { mainResearch, setRecipesFromSearchBar, recipesFromSearch, updateUI, filtersArray, removeItemFromFilterArray, getRecipesFromOneTag, getMainSearchTag }
