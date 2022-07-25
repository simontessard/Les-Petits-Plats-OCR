import { getAppareils, getIngredients } from "./index.js";

function displayDropdownOptions(items) {
    const allFilterButtons = document.querySelectorAll('.btn-secondary')

    allFilterButtons.forEach(button => {

        button.addEventListener('click', function () {

            const DropdownOptions = document.createElement('div')
            DropdownOptions.setAttribute('class', 'dropdown-menu dropdown-multicol')

            const DropdownOptionsExists = document.getElementById(button.name + 'DropdownMenu')

            if (DropdownOptionsExists != null) {
                DropdownOptionsExists.childNodes.forEach(child => {
                    DropdownOptionsExists.removeChild(child)
                })
            } else {
                button.after(DropdownOptions)
            }

            let rowDropdown = document.createElement('div')
            rowDropdown.setAttribute('class', 'dropdown-row')
            DropdownOptions.appendChild(rowDropdown)

            DropdownOptions.setAttribute('id', button.name + 'DropdownMenu')
            DropdownOptions.setAttribute('aria-labelledby', 'btn-' + button.name)

            let newItems;
            console.log(newItems)

            if (button.name === 'ingredients') {
                newItems = getIngredients(items)
            }
            if (button.name === 'appareils') {
                newItems = getAppareils(items)
            }

            let arrayOf3 = spliceIntoChunks(newItems, 3)
            console.log(arrayOf3)

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

function spliceIntoChunks(array, chunkSize) {
    const result = [];
    while (array.length > 0) {
        const chunk = array.splice(0, chunkSize);
        result.push(chunk);
    }
    return result;
}

export { displayDropdownOptions }