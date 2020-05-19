import React from 'react'

const RecipesContext = React.createContext({
  recipes: [],
  ingredients: [],
  weekPlan: [],
})
export default RecipesContext