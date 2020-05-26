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
  
}
    

export default PlannerApiService