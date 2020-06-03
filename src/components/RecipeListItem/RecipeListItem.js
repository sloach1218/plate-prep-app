import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RecipeListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default class RecipeListItem extends Component {
  render() {
    const { recipe } = this.props
    

    return (
      <Link 
          to={{pathname:`/recipe/${recipe.id}`, state: {id:recipe.id}}} 
          className='RecipeListItem'
          key={recipe.name}>
        <div className='RecipeListItem__container'>
            <p>{recipe.name}</p>
            <div className="iconDiv"><FontAwesomeIcon icon={faChevronRight} className="icon"/></div>
            
        </div>
        </Link>
    )
  }
}

