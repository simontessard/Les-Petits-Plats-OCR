import { getAppareils, getIngredients, getUstensils } from "./index.js";

function displayDropdownOptions(items) {
    const allFilterButtons = document.querySelectorAll('.filter-button')
    const filtersSection = document.querySelector('.active-filters')

    allFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('active')

            allFilterButtons.forEach(button => { button.style.width = "190px" })

            const DropdownOptions = document.createElement('div')
            DropdownOptions.setAttribute('class', 'dropdown-option dropdown-multicol')

            const DropdownOptionsExists = document.getElementById(button.name + 'DropdownMenu')
            const DropdownOptionsActive = document.getElementsByClassName('dropdown-option')

            if (DropdownOptionsActive != null) {
                for (let item of DropdownOptionsActive) { item.remove(); }
            }

            if (DropdownOptionsExists != null) {
                DropdownOptionsExists.remove()
                button.style.width = "190px"
            } else {
                button.appendChild(DropdownOptions)
                button.style.width = "900px"
            }

            let rowDropdown = document.createElement('div')
            rowDropdown.setAttribute('class', 'dropdown-row')
            DropdownOptions.appendChild(rowDropdown)

            DropdownOptions.setAttribute('id', button.name + 'DropdownMenu')
            DropdownOptions.setAttribute('aria-labelledby', 'btn-' + button.name)

            let newItems
            let elementBackgroundColor

            switch (button.name) {
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
                    break }

            let arrayOf3 = splitArray(newItems, 3)
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
                    rowDropdown.appendChild(itemDropdown)
                })
            }
        })
    });
}

function splitArray(array, splitSize) {
    const result = [];
    while (array.length > 0) {
        const newArray = array.splice(0, splitSize);
        result.push(newArray);
    }
    return result;
}

export { displayDropdownOptions }