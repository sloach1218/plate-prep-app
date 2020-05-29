import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Context from '../../Context';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import RecipeDetails from '../../routes/RecipeDetails/RecipeDetails';
import AddRecipe from '../../routes/AddRecipe/AddRecipe';
import EditRecipe from '../../routes/EditRecipe/EditRecipe';
import WeekPlanner from '../../routes/WeekPlanner/WeekPlanner';
import AddMeal from '../../routes/AddMeal/AddMeal';
import RecipeApiService from '../../services/recipe-api-service';
import PlannerApiService from '../../services/planner-api-service';





class App extends React.Component  {
  state= {
    recipes: [],
    weekPlan: [],
  }
  componentDidMount(){
    
      RecipeApiService.getRecipes()
        .then((recipes) => {
          this.updateRecipes(recipes)
        }).catch((err) => {
          console.error(err)
        })

        PlannerApiService.getMeals()
        .then((meals) => {
          this.updateWeekPlan(meals)
        }).catch((err) => {
          console.error(err)
        })
  
    
    
  }
  updateRecipe = updatedRecipe => {
    
    this.setState({
      recipes: this.state.recipes.map(recipe => 
        (recipe.id !== Number(updatedRecipe.id)) ? recipe : updatedRecipe
      )
    })
  }
  updateRecipes = recipes => {
    this.setState({ recipes: recipes })
  }
  updateWeekPlan = weekPlan => {
    this.setState({ weekPlan: weekPlan })
  }

  render(){
    const contextValue = {
      recipes: this.state.recipes,
      weekPlan: this.state.weekPlan,
      updateRecipes: this.updateRecipes,
      updateWeekPlan: this.updateWeekPlan,
      updateRecipe: this.updateRecipe,
    }
    


    return (
      <div className='App'>
        <Context.Provider value={contextValue}>
        <Switch>
            <Route
                    exact
                    path={'/'}
                    component={LandingPage}
                  />
            <Route
                    path={'/register'}
                    component={RegistrationPage}
                  />
            <Route
                    path={'/home'}
                    component={HomePage}
                  />
            <Route
                    path={'/recipe/:recipeId'}
                    component={RecipeDetails}
                  />
            <Route
                    path={'/add-recipe'}
                    component={AddRecipe}
                  />
            <Route
                    path={'/edit-recipe/:recipeId'}
                    component={EditRecipe}
                  />
            <Route
                    path={'/meal-planner'}
                    component={WeekPlanner}
                  />
            <Route
                    path={'/add-meal'}
                    component={AddMeal}
                  />
        </Switch>
        </Context.Provider>
        
      </div>
    );
  }
}

export default App;
