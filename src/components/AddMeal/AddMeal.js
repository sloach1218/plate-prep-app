import React from 'react';
import './AddMeal.css';
import RecipesContext from '../../Context';



class AddRecipe extends React.Component {
  static contextType = RecipesContext

  constructor(props){
    super(props);
    this.state = {
      mealTime:{
        value: "Breakfast",
        touched:false
      },
      recipe:{
        value: "",
        touched:false
      },
    };
  }
  updateMealTime(mealTime) {
    this.setState({mealTime: { value: mealTime, touched:true }});
  }
  updateRecipe(recipe) {
    this.setState({recipe: { value: recipe, touched:true }});
  }
  

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('submitted')

  }



  render(){
    const { recipes = [] } = this.context;
    if(!this.props.show){
        return null;
    }
    return (
      <div  className="addMealModal">
        <div className="closeBtn" onClick={() => {
              this.props.onClose()
            }}>Close</div>
        <form className='AddRecipeForm' onSubmit={e => this.handleSubmit(e)}>
            <legend>Add a Meal</legend>
            <div className='mealTime'>
              <label htmlFor='AddMealForm__mealTime'>
                Meal time: 
              </label>
              <select name='mealTime' value={this.state.mealTime.value} onChange={e => this.updateMealTime(e.target.value)} className="mealTimeSelect">
                  <option value="Breakfast" key="Breakfast">Breakfast</option>
                  <option value="Lunch" key="Lunch">Lunch</option>
                  <option value="Dinner" key="Dinner">Dinner</option>
                  <option value="Snack" key="Snack">Snack</option>
              </select>
            </div>
            <div className='recipe'>
              <label htmlFor='AddMealForm__recipe'>
                Recipe: 
              </label>
              <select name='recipe' value={this.state.recipe.value} onChange={e => this.updateRecipe(e.target.value)} className="mealTimeSelect">
                  {recipes.map(recipe => {
                    return <option value={recipe.name} key={recipe.name}>{recipe.name}</option>
                  })}              
              </select>
            </div>
            <button type='submit'>Add Meal</button>
  
        </form>
      </div>
    );
  }
}

export default AddRecipe;
