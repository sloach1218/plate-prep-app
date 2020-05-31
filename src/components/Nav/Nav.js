import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service';


class Nav extends React.Component {
  
  handleLogout = () => {
    TokenService.clearAuthToken()
  }
  
  render(){
    return (
      <nav className='mainNav'>
          
          <Link to={'/home'} className='HomeBtn'>My Recipes</Link>
          <Link to={'/add-recipe'} className='AddRecipeBtn'>Add Recipe</Link>
          <Link to={'/meal-planner'} className='mealPlannerBtn'>Week Planner</Link>
          <Link to={'/'} onClick={this.handleLogout} className='LogoutBtn'>Logout</Link>
      </nav>
    );
  }
}

export default Nav;