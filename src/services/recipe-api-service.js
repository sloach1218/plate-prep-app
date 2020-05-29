import config from '../config'

const RecipeApiService = {
  getRecipes(){
    return fetch(config.API_RECIPES_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => response.json())
  },

  postRecipe(recipe) {
    
    return fetch(`${config.API_RECIPES_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateRecipe(recipe){
    return fetch(`${config.API_RECIPES_ENDPOINT}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
  },
  deleteRecipe(id){
    return fetch(`${config.API_RECIPES_ENDPOINT}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(id),
    })
    .then(res => {
      if (!res.ok){
        return res.json().then(e => Promise.reject(e))
      }
      return
    })
  },
  
}
    

export default RecipeApiService