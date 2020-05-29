import React from 'react'

const RecipesContext = React.createContext({
  recipes: [],
  ingredients: [],
  weekPlan: [],
  updateRecipes: () => {},
  updateWeekPlan: () => {},
  updateRecipe: () => {},
})
export default RecipesContext