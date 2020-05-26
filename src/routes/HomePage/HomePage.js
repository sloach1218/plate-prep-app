import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipeListItem from '../../components/RecipeListItem/RecipeListItem';
import RecipesContext from '../../Context';
import RecipeApiService from '../../services/recipe-api-service';



class HomePage extends React.Component {
  static contextType = RecipesContext

  componentDidMount(){
    RecipeApiService.getRecipes()
      .then((recipes) => {
        this.context.updateRecipes(recipes)
      }).catch((err) => {
        console.error(err)
      })

  }
  

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
