import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeDetails.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipesContext from '../../Context';
import {getRecipe} from '../../appHelpers';
import RecipeApiService from '../../services/recipe-api-service';


class RecipeDetails extends React.Component {
  static contextType = RecipesContext

  renderIngredients(recipe) {
    if(recipe.ingredients){
      return recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
    }
  }

  renderDirections(recipe) {
      if(recipe.directions){
        return recipe.directions.map((step, index) => <li key={index}>{step}</li>)
      }
  }

  deleteRecipe(id,name) {
    const recipeId ={
      id: id,
      name: name
    }
    RecipeApiService.deleteRecipe(recipeId)
      .then(() => {
        window.location.href = '/home'

      })
      .catch(error => {
        console.error(error)
      })
  }


  render() {
    
    const { recipes = [] } = this.context;
    const recipeId = this.props.match.params.recipeId
    const recipe = getRecipe(recipes, recipeId) || {};

    return (
        <div>
          <Header />
          <Nav />
          <main className='Recipe__details'>
              
              <h2>{recipe.name}</h2>
              <h3>Ingredients</h3>
              <ul>{this.renderIngredients(recipe)}</ul>
              <h3>Directions</h3>
              <ol>{this.renderDirections(recipe)}</ol>
              <Link 
                  to={{
                    pathname:`/edit-recipe/${recipe.id}`,
                    state: {
                      name: recipe.name,
                      ingredients: recipe.ingredients,
                      directions: recipe.directions,
                      id: recipe.id
                    }
                  }}
                  className='editBtn'
                  > Edit Details</Link>
              <button
                  className='RecipeDeleteBtn'
                  onClick={() =>
                    this.deleteRecipe(recipeId, recipe.name)
                  }
                  >Delete Recipe
              </button>
          </main>
        </div>
      
    )
  }
}

export default RecipeDetails;
