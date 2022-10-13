import { getAppareils, getIngredients, getUstensils } from "./index.js";

const filtersSection = document.querySelector('.active-filters')

function displayDropdownOptions(items) {
    const allFilterButtons = document.querySelectorAll('.filter-button')

    allFilterButtons.forEach(button => {
        button.addEventListener('click', function listingTag() {

            allFilterButtons.forEach(oneButton => {
                if (oneButton.name != button.name) {
                    oneButton.style.width = "190px"
                    oneButton.classList.remove('active')
                }
            })

            if (button.classList.value == 'filter-button active') {
                button.classList.remove('active')
            } else {
                button.classList.add('active')
            }

            const DropdownOptions = document.createElement('div')
            DropdownOptions.setAttribute('class', 'dropdown-option dropdown-multicol')

            const DropdownOptionsExists = document.getElementById(button.name + 'DropdownMenu')

            let searchInputTag = document.getElementById('searchInput' + button.name)

            deleteActiveDropdownOptions('dropdown-option')

            if (DropdownOptionsExists != null) {
                DropdownOptionsExists.remove()
                button.style.width = "190px"
                searchInputTag.style.display = 'none'
                searchInputTag.value = ''
            } else {
                button.appendChild(DropdownOptions)
                button.style.width = "900px"
                searchInputTag.style.display = 'block'
                searchInputTag.value = ''
            }

            searchInputTag.addEventListener('input', function () {
                deleteActiveDropdownOptions('dropdown-item')

                let newItems = whichButton(this.parentElement.name, items)[0]
                let elementBackgroundColor = whichButton(this.parentElement.name, items)[1]

                // Research if characters entered by the user are in one of the tag in real time
                let resultResearch = newItems.filter(tag => tag.includes(this.value) || tag.toUpperCase().includes(this.value) || tag.toLowerCase().includes(this.value))

                // Update the tag list displayed in the dropdown with result from the search
                createDropdownList(resultResearch, elementBackgroundColor)
            })

            // Disable the closing of dropdown on click
            DropdownOptions.addEventListener('click', function (e) {
                e.stopPropagation()
            })
            searchInputTag.addEventListener('click', function (e) {
                e.stopPropagation()
            })

            let rowDropdown = document.createElement('div')
            rowDropdown.setAttribute('class', 'dropdown-row')
            DropdownOptions.appendChild(rowDropdown)

            DropdownOptions.setAttribute('id', button.name + 'DropdownMenu')
            DropdownOptions.setAttribute('aria-labelledby', 'btn-' + button.name)

            let newItems = whichButton(button.name, items)[0]
            let elementBackgroundColor = whichButton(button.name, items)[1]

            createDropdownList(newItems, elementBackgroundColor)
        })
    });
}

async function createDropdownList(items, elementBackgroundColor) {
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
            let rowDropdown = document.querySelector('.dropdown-row')
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

function deleteActiveDropdownOptions(dropdownClass) {
    let dropdownOptionsActive = document.getElementsByClassName(dropdownClass)
    console.log(dropdownOptionsActive)
    dropdownOptionsActive = Array.from(dropdownOptionsActive);
    if (dropdownOptionsActive != null) {
        for (let item of dropdownOptionsActive) { item.remove(); }
    }
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

export { displayDropdownOptions }