import { getAppareils, getIngredients, getUstensils } from "./index.js";

const filtersSection = document.querySelector('.active-filters')

function addListenerToFilterButton() {
    const allFilterButtons = document.querySelectorAll('.filter-button')

    allFilterButtons.forEach(button => {
        button.addEventListener('click', function openCloseDropdown() {
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

        let searchInputTag = document.getElementById('searchInput' + button.name)

        button.appendChild(dropdownOptions)

        searchInputTag.addEventListener('input', function () {
            deleteActiveDropdownOptions(button.id, 'dropdown-item') 

            let newItems = whichButton(this.parentElement.name, items)[0]
            let elementBackgroundColor = whichButton(this.parentElement.name, items)[1]
            // Research if characters entered by the user are in one of the tag in real time
            let resultResearch = newItems.filter(tag => tag.includes(this.value) || tag.toUpperCase().includes(this.value) || tag.toLowerCase().includes(this.value))
            // Update the tag list displayed in the dropdown with result from the search
            createDropdownList(resultResearch, elementBackgroundColor, this.nextSibling.firstChild)
        })

        // Disable the closing of dropdown on click
        dropdownOptions.addEventListener('click', function (e) {
            e.stopPropagation()
        })
        searchInputTag.addEventListener('click', function (e) {
            e.stopPropagation()
        })

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
            itemDropdown.addEventListener('click', function () {
                let activeFilterElement = document.createElement('div');
                activeFilterElement.setAttribute('class', 'filter-element');

                let activeFilterText = document.createElement('p');
                activeFilterText.innerText = itemDropdown.textContent;
                activeFilterText.setAttribute('class', 'filter-tag')
                activeFilterElement.appendChild(activeFilterText)

                let activeFilterImg = document.createElement('img');
                activeFilterImg.setAttribute('src', 'assets/icons/times-circle-regular.svg')
                activeFilterImg.setAttribute('class', 'filter-cross')
                activeFilterImg.addEventListener('click', function () {
                    activeFilterElement.remove()
                })
                activeFilterElement.style.backgroundColor = elementBackgroundColor

                activeFilterElement.appendChild(activeFilterImg)
                filtersSection.appendChild(activeFilterElement)
            })
            if (rowDropdown != null) {
                rowDropdown.appendChild(itemDropdown)
            }
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

function deleteActiveDropdownOptions(buttonId, dropdownClass) {
    let dropdownOptionsActive = document.querySelectorAll('#'+ buttonId +' .'+dropdownClass)
    dropdownOptionsActive = Array.from(dropdownOptionsActive);
    if (dropdownOptionsActive != null) {
        for (let item of dropdownOptionsActive) { item.remove(); }
    }
}

function deleteAllDropdownOptions() {
    let dropdownOptionsAll = document.getElementsByClassName('dropdown-option')
    let allDropdownOptionsActive = Array.from(dropdownOptionsAll);
    allDropdownOptionsActive.forEach(oneDropdown => {
        oneDropdown.remove()
    })
}

function whichButton(name, items) {
    let newItems
    let elementBackgroundColor

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

export { addListenerToFilterButton, createDropdownOptions, deleteAllDropdownOptions, displayHideDropdownOptions }