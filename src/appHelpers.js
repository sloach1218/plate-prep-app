export const getRecipe = (recipe, recipeId) => {
    const theRecipe = recipe.find(recipe => recipe.id === Number(recipeId))
    return theRecipe;
}

export const getIngredients = (ingredients, recipeId) => {
    const theIngredients = ingredients.filter(ingredient => ingredient.recipeId !== Number(recipeId))
    return theIngredients;
}