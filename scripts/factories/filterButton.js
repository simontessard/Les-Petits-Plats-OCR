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

function createFilterButton() {
  const btnGroup = document.querySelector('.btn-group')

  const ingredientsButtonModel = filterButtonFactory('ingredients')
  const ingredientsButton = ingredientsButtonModel.getFilterButtonDOM()
  ingredientsButton.name = 'ingredients'
  ingredientsButton.appendChild(createInputTextTag('ingredients'))

  const appareilsButtonModel = filterButtonFactory('appareils')
  const appareilsButton = appareilsButtonModel.getFilterButtonDOM()
  appareilsButton.name = 'appareils'
  appareilsButton.appendChild(createInputTextTag('appareils'))

  const ustensilesButtonModel = filterButtonFactory('ustensiles')
  const ustensilesButton = ustensilesButtonModel.getFilterButtonDOM()
  ustensilesButton.name = 'ustensiles'
  ustensilesButton.appendChild(createInputTextTag('ustensiles'))

  btnGroup.append(ingredientsButton, appareilsButton, ustensilesButton)
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

export { filterButtonFactory, createFilterButton }