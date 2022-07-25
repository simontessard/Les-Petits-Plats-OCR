function filterButtonFactory (name) {
  
    function getFilterButtonDOM() {
      const filterButton = document.createElement('button')
      filterButton.setAttribute('class','btn btn-secondary btn-lg dropdown-toggle p-4 mr-4 border-0 rounded')
      if (name === 'ingredients') {
        filterButton.classList.add("bg-primary");
      }
      filterButton.setAttribute('id','btn-'+name)
      filterButton.setAttribute('type','button')
      filterButton.setAttribute('data-toggle','dropdown')
      filterButton.setAttribute('aria-haspopup','true')
      filterButton.setAttribute('aria-expanded','false')

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

   const appareilsButtonModel = filterButtonFactory('appareils')
   const appareilsButton = appareilsButtonModel.getFilterButtonDOM()
   appareilsButton.name = 'appareils'

   const ustensilesButtonModel = filterButtonFactory('ustensiles')
   const ustensilesButton = ustensilesButtonModel.getFilterButtonDOM()
   ustensilesButton.name = 'ustensiles'

   btnGroup.append(ingredientsButton, appareilsButton, ustensilesButton)
}
  
export { filterButtonFactory, createFilterButton }