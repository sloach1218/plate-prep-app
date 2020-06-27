import React from 'react';
import './Nav.css';
import { NavLink, Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

//renders navigation for logged in user
class Nav extends React.Component {
  
  handleLogout = () => {
    TokenService.clearAuthToken()
  }
  
  render(){
    return (
      <nav className='mainNav'>
          <NavLink to={'/home'} className='HomeBtn' activeClassName="selected">My<br></br>Recipes</NavLink>
          <NavLink to={'/add-recipe'} className='AddRecipeBtn' activeClassName="selected">Add<br></br>Recipe</NavLink>
          <NavLink to={'/meal-planner'} className='mealPlannerBtn' activeClassName="selected">Week<br></br>Planner</NavLink>
          <Link to={'/'} onClick={this.handleLogout} className='LogoutBtn'>Sign<br></br>Out</Link>
      </nav>
    );
  }
}

export default Nav;