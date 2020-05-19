import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import dummyStore from '../../dummyStore'
import Context from '../../Context';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import RecipeDetails from '../../routes/RecipeDetails/RecipeDetails';
import AddRecipe from '../../routes/AddRecipe/AddRecipe';
import WeekPlanner from '../../routes/WeekPlanner/WeekPlanner';



class App extends React.Component  {
  state= {
    recipes: [],
    ingredients: [],
    weekPlan: [],
  }
  componentDidMount(){
    this.setState({
      recipes: dummyStore.recipes,
      ingredients: dummyStore.ingredients,
      weekPlan: dummyStore.weekPlan,
    })
    
  }

  render(){
    const contextValue = {
      recipes: this.state.recipes,
      ingredients: this.state.ingredients,
      weekPlan: this.state.weekPlan,
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
                    path={'/meal-planner'}
                    component={WeekPlanner}
                  />
        </Switch>
        </Context.Provider>
        
      </div>
    );
  }
}

export default App;
