function recipeFactory (data) {
    const { id, name, time, description, ingredients } = data
  
    function getRecipeCardDOM () {
      const card = document.createElement('div')
      card.setAttribute('class','card')

      const cardImg = document.createElement('img')
      cardImg.setAttribute('class','card-img-top')

      const cardBody = document.createElement('div')
      cardBody.setAttribute('class','card-body')

      const cardEntete = document.createElement('div')
      cardEntete.setAttribute('class','entete px-3')

      const cardRecette = document.createElement('div')
      cardRecette.setAttribute('class','recette')

      const cardTitle = document.createElement('h5')
      cardTitle.setAttribute('class','card-title')
      cardTitle.textContent = name

      const cardTime = document.createElement('div')
      cardTime.setAttribute('class','entete-time')

      const clockLogo = document.createElement('img')
      clockLogo.setAttribute('src','assets/icons/clock-regular.svg')
      clockLogo.setAttribute('class','mr-2')

      const recipeTime = document.createElement('p')
      recipeTime.setAttribute('class','font-weight-bold')
      recipeTime.textContent = time + " min";

      const recipeDesc = document.createElement('p')
      recipeDesc.setAttribute('class','card-text text-truncate')
      recipeDesc.textContent = description;

      const recipeIngredient = document.createElement('div')
      recipeIngredient.setAttribute('class','col-sm-6')

      ingredients.forEach(ingredient => {
          const ligne = document.createElement('p')
          ligne.setAttribute('class','mb-0')
          const ingredientNameBold = document.createElement('strong')
          const ingredientNameEnd = document.createElement('span')
          let unity = ingredient.unit;
          if (unity === undefined) {
            unity = "";
          }
          let quantity = ingredient.quantity;
          if (quantity === undefined) {
            quantity = "au choix";
          }
          ingredientNameBold.textContent = ingredient.ingredient
          ingredientNameEnd.textContent = ": " + quantity + ' '+ unity;
          recipeIngredient.appendChild(ligne)
          ligne.append(ingredientNameBold, ingredientNameEnd)
      });

      card.append(cardImg, cardBody)
      cardBody.append(cardEntete, cardRecette)
      cardEntete.append(cardTitle, cardTime)
      cardTime.append(clockLogo, recipeTime)
      cardRecette.append(recipeIngredient, recipeDesc)
      
      return (card)
    }
    return { name, getRecipeCardDOM, id }
  }
  
  export { recipeFactory }