import React from 'react';
import { Switch } from 'react-router-dom';
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
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';

class App extends React.Component  {
  state= {
    recipes: [],
    weekPlan: [],
  }

  //get existing recipes and meal plan to populate app
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
            <PublicOnlyRoute
                    exact
                    path={'/'}
                    component={LandingPage}
                  />
            <PublicOnlyRoute
                    path={'/register'}
                    component={RegistrationPage}
                  />
            <PrivateRoute
                    path={'/home'}
                    component={HomePage}
                  />
            <PrivateRoute
                    path={'/recipe/:recipeId'}
                    component={RecipeDetails}
                  />
            <PrivateRoute
                    path={'/add-recipe'}
                    component={AddRecipe}
                  />
            <PrivateRoute
                    path={'/edit-recipe/:recipeId'}
                    component={EditRecipe}
                  />
            <PrivateRoute
                    path={'/meal-planner'}
                    component={WeekPlanner}
                  />
            <PrivateRoute
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