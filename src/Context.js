import React from 'react'

const RecipesContext = React.createContext({
  recipes: [],
  ingredients: [],
  weekPlan: [],
  updateRecipes: () => {},
  updateWeekPlan: () => {},
})
export default RecipesContext