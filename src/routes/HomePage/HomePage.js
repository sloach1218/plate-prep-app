import React from 'react';
import { Link } from 'react-router-dom'
import './HomePage.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipeListItem from '../../components/RecipeListItem/RecipeListItem';
import RecipesContext from '../../Context';

//hompage once a user logs in, lists all recipes associated with user
class HomePage extends React.Component {
  static contextType = RecipesContext
  
  renderRecipes() {
    const { recipes = [] } = this.context;
    if(recipes.length === 0){
      return(<Link to={{pathname:`/add-recipe`}} className="AddRecipeCTA">Add Your First Recipe Here!</Link>)
    } else {
      return recipes.map(recipe =>
        <RecipeListItem
          key={recipe.id}
          recipe={recipe}
        />
      )}
  }

  render(){
    return (
      <div>
        <Header />
        <Nav />
        <div className="recipeListContainer">
          {this.renderRecipes()}
        </div>
      </div>
    );
  }
}

export default HomePage;