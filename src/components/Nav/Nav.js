import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'

class Nav extends React.Component {
  
  
  
  render(){
    return (
      <nav className='mainNav'>
          
          <Link to={'/home'} className='HomeBtn'>My Recipes</Link>
          <Link to={'/add-recipe'} className='AddRecipeBtn'>Add Recipe</Link>
          <Link to={'/meal-planner'} className='mealPlannerBtn'>Planner</Link>
          <Link to={'/'} className='LogoutBtn'>Logout</Link>
      </nav>
    );
  }
}

export default Nav;