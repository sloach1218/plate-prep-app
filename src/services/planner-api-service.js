import config from '../config'

const PlannerApiService = {
  getMeals(){
    return fetch(config.API_PLANNER_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => response.json())
  },
  postMeal(meal) {
    return fetch(`${config.API_PLANNER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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