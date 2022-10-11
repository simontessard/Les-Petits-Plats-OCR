function filterButtonFactory(name) {

  function getFilterButtonDOM() {
    const filterButton = document.createElement('button')
    filterButton.setAttribute('class', 'filter-button')
    filterButton.setAttribute('id', 'btn-' + name)
    filterButton.setAttribute('type', 'button')
    filterButton.innerText = name.charAt(0).toUpperCase() + name.slice(1)

    return (filterButton)
  }
  return { getFilterButtonDOM }
}

function initFilterButtons() {
  const btnGroup = document.querySelector('.btn-group')
  btnGroup.append(createFilterButton('ingredients'), createFilterButton('appareils'), createFilterButton('ustensiles'))
}

function createFilterButton(name) {
  const ButtonModel = filterButtonFactory(name)
  const Button = ButtonModel.getFilterButtonDOM()
  Button.name = name
  Button.append(createDropdownArrow(), createInputTextTag(name))
  return Button
}

function createDropdownArrow() {
  const dropdownArrow = document.createElement('div')
  dropdownArrow.setAttribute('class', 'dropdown-arrow')
  return dropdownArrow
}

function createInputTextTag(name) {

  const searchInputTag = document.createElement('input')

  searchInputTag.setAttribute('type', 'search')
  searchInputTag.setAttribute('value', '')
  searchInputTag.setAttribute('id', 'searchInput' + name)
  name = name.slice(0, -1);
  searchInputTag.setAttribute('placeholder', 'Rechercher un ' + name)
  searchInputTag.setAttribute('class', 'typing-bar')
  searchInputTag.setAttribute('autocomplete', 'off')

  return (searchInputTag)
}

export { filterButtonFactory, initFilterButtons }