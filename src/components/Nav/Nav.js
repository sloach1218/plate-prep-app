import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'

class Nav extends React.Component {
  
  
  
  render(){
    return (
      <nav className='mainNav'>
          
          <Link to={'/home'} className='HomeBtn'>Recipes</Link>
          <Link to={'/'} className='LogoutBtn'>Logout</Link>
      </nav>
    );
  }
}

export default Nav;