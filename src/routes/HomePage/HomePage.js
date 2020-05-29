import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipeListItem from '../../components/RecipeListItem/RecipeListItem';
import RecipesContext from '../../Context';



class HomePage extends React.Component {
  static contextType = RecipesContext

 
  

  renderRecipes() {
    const { recipes = [] } = this.context;
    
      return recipes.map(recipe =>
        <RecipeListItem
          key={recipe.id}
          recipe={recipe}
        />
      )
    
    
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
