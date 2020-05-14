import React from 'react';
import './RecipeDetails.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipesContext from '../../Context';
import {getRecipe, getIngredients} from '../../appHelpers';


class RecipeDetails extends React.Component {
  static contextType = RecipesContext


  renderDirections(recipe) {
      if(recipe.directions){
        return recipe.directions.map(step => <li>{step}</li>)
      }
  }


  render() {
    
    const { recipes = [] } = this.context;
    const recipe = getRecipe(recipes, this.props.match.params.recipeId) || {};
    const { ingredients = [] } = this.context;
    const recipeIngredients = getIngredients(ingredients, this.props.match.params.recipeId) || {};
    

    return (
        <div>
          <Header />
          <Nav />
          <main className='Recipe__details'>
              
              <h2>{recipe.name}</h2>
              <h3>Ingredients</h3>
              <ul>{recipeIngredients.map(ingredient => <li>{ingredient.name} - {ingredient.amount}</li>)}</ul>
              <h3>Directions</h3>
              <ol>{this.renderDirections(recipe)}</ol>
              
              
          </main>
        </div>
      
    )
  }
}

export default RecipeDetails;
