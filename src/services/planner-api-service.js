import config from '../config'
import TokenService from '../services/token-service'


const PlannerApiService = {
  getMeals(){
    return fetch(config.API_PLANNER_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,

      }
    }).then(response => response.json())
  },
  postMeal(meal) {
    return fetch(`${config.API_PLANNER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,

      },
      body: JSON.stringify(meal),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  
}
    

export default PlannerApiService