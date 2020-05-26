import React from 'react'

const RecipesContext = React.createContext({
  recipes: [],
  ingredients: [],
  weekPlan: [],
  updateRecipes: () => {},
})
export default RecipesContext