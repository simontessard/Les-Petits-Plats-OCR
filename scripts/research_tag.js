import { getAppareils, getIngredients, getUstensils } from "./index.js";

function displayDropdownOptions(items) {
    const allFilterButtons = document.querySelectorAll('.filter-button')

    allFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('active')

            allFilterButtons.forEach(button => {
                button.style.width = "190px";
            })

            const DropdownOptions = document.createElement('div')
            DropdownOptions.setAttribute('class', 'dropdown-option dropdown-multicol')

            const DropdownOptionsExists = document.getElementById(button.name + 'DropdownMenu')
            const DropdownOptionsActive = document.getElementsByClassName('dropdown-option')

            if (DropdownOptionsActive != null) {
                for (let item of DropdownOptionsActive) { item.remove(); }
            }

            if (DropdownOptionsExists != null) {
                DropdownOptionsExists.remove()
                button.style.width = "190px";
            } else {
                button.appendChild(DropdownOptions)
                button.style.width = "900px";
                console.log(DropdownOptions.clientWidth)
            }

            let rowDropdown = document.createElement('div')
            rowDropdown.setAttribute('class', 'dropdown-row')
            DropdownOptions.appendChild(rowDropdown)

            DropdownOptions.setAttribute('id', button.name + 'DropdownMenu')
            DropdownOptions.setAttribute('aria-labelledby', 'btn-' + button.name)

            let newItems;

            if (button.name === 'ingredients') {
                newItems = getIngredients(items)
            }
            if (button.name === 'appareils') {
                newItems = getAppareils(items)
            }
            if (button.name === 'ustensiles') {
                newItems = getUstensils(items)
            }

            let arrayOf3 = splitArray(newItems, 3)
            let min = arrayOf3.length > 10 ? 10 : arrayOf3.length // instruction ternaire 

            for (let rowNumber = 0; rowNumber < min; rowNumber++) {

                arrayOf3[rowNumber].forEach(ingredient => {
                    const itemDropdown = document.createElement('a')
                    itemDropdown.setAttribute('class', 'dropdown-item')
                    itemDropdown.innerText = ingredient
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