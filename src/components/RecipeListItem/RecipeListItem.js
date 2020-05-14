import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RecipeListItem.css'

export default class RecipeListItem extends Component {
  render() {
    const { recipe } = this.props
    

    return (
      <Link 
          to={{pathname:`/recipe/${recipe.id}`, state: {id:recipe.id}}} 
          className='RecipeListItem'>
        <div className='RecipeListItem__container'>
            <p>{recipe.name}</p>
        </div>
        </Link>
    )
  }
}

