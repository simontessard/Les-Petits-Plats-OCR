import { getAppareils, getIngredients, getUstensils } from "./index.js";
import { setRecipesFromSearchBar, recipesFromSearch, updateUI, filtersArray, removeItemFromFilterArray, getRecipesFromOneTag, getMainSearchTag } from "./research_main.js";
import { recipes } from "./data/recipes.js";

const filtersSection = document.querySelector('.active-filters')

function addListenerToFilterButton() {
    const allFilterButtons = document.querySelectorAll('.filter-button')

    allFilterButtons.forEach(button => {
        button.addEventListener('click', function openCloseDropdown() {
            // Reset visibility in case of close when searching
            let dropdownitems = this.lastChild.children[0].children
            dropdownitems = Array.from(dropdownitems)
            dropdownitems.forEach(tag => { tag.hidden = false })
            // Case button to other button click
            allFilterButtons.forEach(oneButton => {
                if (oneButton.name != button.name) {
                    let searchInputTag = document.getElementById('searchInput' + oneButton.name)
                    searchInputTag.classList.remove('active')
                    searchInputTag.value = ''
                    oneButton.classList.remove('active')
                    displayHideDropdownOptions(oneButton, 'none')
                }
            })
            let searchInputTag = document.getElementById('searchInput' + button.name)
            // Case button click to same button
            if (button.classList.contains('active')) {
                button.classList.remove('active')
                searchInputTag.classList.remove('active')
                searchInputTag.value = ''
                displayHideDropdownOptions(button, 'none')
            } else {
                button.classList.add('active')
                searchInputTag.classList.add('active')
                searchInputTag.value = ''
                displayHideDropdownOptions(button, 'block')
            }
        })
    })
}

function createDropdownOptions(items) {
    const allFilterButtons = document.querySelectorAll('.filter-button')

    allFilterButtons.forEach(button => {
        const dropdownOptions = document.createElement('div')
        dropdownOptions.setAttribute('class', 'dropdown-option dropdown-multicol')
        button.appendChild(dropdownOptions)

        let searchInputTag = document.getElementById('searchInput' + button.name)

        searchInputTag.addEventListener('input', function () {
            let dropdownitems = this.nextSibling.children[0].children
            dropdownitems = Array.from(dropdownitems)

            dropdownitems.forEach(tag => {
                if (tag.innerText.toLowerCase().includes(this.value.toLowerCase())) {
                    tag.hidden = false
                } else { tag.hidden = true }
            })
        })

        // Disable the closing of dropdown on click
        searchInputTag.addEventListener('click', function (e) { e.stopPropagation() })

        let rowDropdown = document.createElement('div')
        rowDropdown.setAttribute('class', 'dropdown-row')
        dropdownOptions.appendChild(rowDropdown)

        dropdownOptions.setAttribute('id', button.name + 'DropdownMenu')
        dropdownOptions.setAttribute('aria-labelledby', 'btn-' + button.name)
        dropdownOptions.style.display = 'none'

        let newItems = whichButton(button.name, items)[0]
        let elementBackgroundColor = whichButton(button.name, items)[1]

        createDropdownList(newItems, elementBackgroundColor, rowDropdown)
    })
}

function displayHideDropdownOptions(button, statut) {
    let buttonName = button.name
    const dropdownsOptions = document.getElementById(buttonName + 'DropdownMenu')
    dropdownsOptions.style.display = statut
}

function createDropdownList(items, elementBackgroundColor, rowDropdown) {
    let arrayOf3 = splitArray(items, 3)
    let min = arrayOf3.length > 10 ? 10 : arrayOf3.length // instruction ternaire 

    for (let rowNumber = 0; rowNumber < min; rowNumber++) {

        arrayOf3[rowNumber].forEach(ingredient => {
            const itemDropdown = document.createElement('a')
            itemDropdown.setAttribute('class', 'dropdown-item')
            itemDropdown.innerText = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            itemDropdown.addEventListener('click', function (e) {
                if (itemDropdown.classList.contains('selected')) {
                    itemDropdown.classList.remove('selected');

                    let allActiveFilters = document.getElementsByClassName('filter-tag')
                    allActiveFilters = Array.from(allActiveFilters)

                    if (allActiveFilters !== null) {
                        allActiveFilters.forEach(oneFilter => {
                            if (oneFilter.textContent === itemDropdown.innerText) {
                                oneFilter.parentElement.remove()
                                filtersArray = filtersArray.filter(function (e) { return e !== oneFilter.textContent })
                            }
                        })
                    }
                } else {
                    itemDropdown.classList.add('selected');
                }

                if (itemDropdown.classList.contains('selected')) {
                    let activeFilterElement = document.createElement('div');
                    activeFilterElement.setAttribute('class', 'filter-element');

                    let activeFilterText = document.createElement('p');
                    activeFilterText.innerText = itemDropdown.textContent;
                    activeFilterText.setAttribute('class', 'filter-tag')
                    activeFilterElement.appendChild(activeFilterText)

                    let activeFilterImg = document.createElement('img');
                    activeFilterImg.setAttribute('src', 'assets/icons/times-circle-regular.svg')
                    activeFilterImg.setAttribute('class', 'filter-cross')

                    // Click cross to delete an active tag
                    activeFilterImg.addEventListener('click', function () {
                        activeFilterElement.remove()
                        itemDropdown.classList.remove('selected');
                        removeTag(activeFilterText.textContent)
                    })
                    activeFilterElement.style.backgroundColor = elementBackgroundColor

                    activeFilterElement.appendChild(activeFilterImg)
                    filtersSection.appendChild(activeFilterElement)

                    addTag(activeFilterText.textContent)
                }
            })
            if (rowDropdown != null) { rowDropdown.appendChild(itemDropdown) }
        })
    }
}

function splitArray(array, splitSize) {
    const result = [];
    while (array.length > 0) {
        const newArray = array.splice(0, splitSize);
        result.push(newArray);
    }
    return result;
}

function deleteAllDropdownOptions() {
    let dropdownOptionsAll = document.getElementsByClassName('dropdown-option')
    let allDropdownOptionsActive = Array.from(dropdownOptionsAll);
    allDropdownOptionsActive.forEach(oneDropdown => {
        oneDropdown.remove()
    })
}

function whichButton(name, items) {
    let newItems, elementBackgroundColor

    switch (name) {
        case 'ingredients':
            newItems = getIngredients(items)
            elementBackgroundColor = '#3282f7'
            break
        case 'appareils':
            newItems = getAppareils(items)
            elementBackgroundColor = '#68D9A4'
            break
        case 'ustensiles':
            newItems = getUstensils(items)
            elementBackgroundColor = '#ED6454'
            break
    }
    return [newItems, elementBackgroundColor]
}

function addTag(tag) {
    // Push the new tag to the array of all tags
    filtersArray.push(tag)
    let result = getRecipesFromOneTag(recipesFromSearch, tag)
    setRecipesFromSearchBar(result)
}

function removeTag(tag) {
    removeItemFromFilterArray(tag)

    if (filtersArray.length > 0) {
        setRecipesFromSearchBar(getRecipesFromMultiplesTags(filtersArray))
    }
    else {
        let mainSearchTag = getMainSearchTag()
        if (mainSearchTag != null) {
            setRecipesFromSearchBar(getRecipesFromOneTag(recipes, mainSearchTag))
        } else {
            setRecipesFromSearchBar(recipes)
        }
    }
}

function getRecipesFromMultiplesTags(tagsArray) {
    let recipesFromTags = recipes
    tagsArray.forEach(tag => {
        recipesFromTags = getRecipesFromOneTag(recipesFromTags, tag)
    })
    return recipesFromTags
}

export { addListenerToFilterButton, createDropdownOptions, deleteAllDropdownOptions, displayHideDropdownOptions, getRecipesFromMultiplesTags }