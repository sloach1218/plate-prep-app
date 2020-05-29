import React from 'react';
import './AddMeal.css';
import RecipesContext from '../../Context';
import PlannerApiService from '../../services/planner-api-service';
import {getMeals} from '../../appHelpers';




class AddRecipe extends React.Component {
  static contextType = RecipesContext

  constructor(props){
    super(props);
    this.state = {
      mealTime:{
        value: "",
        touched:false
      },
      recipe:{
        value: "",
        touched:false
      },
      newRecipe:{
        name: "",
        touched:false
      },
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      date: null,
    };
  }
  
  
  componentWillReceiveProps(nextProps){
    if(nextProps.date !== this.props.date) {
      this.updateExistingMeals(nextProps);
    }
  }
  updateExistingMeals(props){
    const date = props.date
    const { weekPlan = [] } = this.context;

    const meals = getMeals( weekPlan, date)
    if (meals === undefined){
      this.setState({
        breakfast:[], 
        lunch:[],
        dinner:[],
        snack:[],
      })
      return
    }
    this.setState({
      breakfast:meals.breakfast, 
      lunch:meals.lunch,
      dinner:meals.dinner,
      snack:meals.snack,
    })
  }
  

  updateMealTime(mealTime) {
    this.setState({mealTime: { value: mealTime, touched:true }});
  }
  updateRecipe(recipe) {
    this.setState({recipe: { value: recipe, touched:true }});
  }

  handleAddMeal(){
    const mealTime = this.state.mealTime.value
    const recipe = this.state.recipe.value

    if (recipe === ''){return}

    if (mealTime === 'breakfast'){
      this.setState(state => {
        const breakfast = state.breakfast.concat(recipe);
        return{
          breakfast
        }
      })
    } if (mealTime === 'lunch'){
      this.setState(state => {
        const lunch = state.lunch.concat(recipe);
        return{
          lunch
        }
      })
    }if (mealTime === 'dinner'){
      this.setState(state => {
        const dinner = state.dinner.concat(recipe);
        return{
          dinner
        }
      })
    }if (mealTime === 'snack'){
      this.setState(state => {
        const snack = state.snack.concat(recipe);
        return{
          snack
        }
      })
    }


  
    
      
    this.setState({mealTime: { value: ''}});
    this.setState({recipe: { value: ''}});}
      
  
    
  
  

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('submitted')

    const { name } = ev.target
    const ingredients = this.state.ingredients
    const directions = this.state.directions
    
    PlannerApiService.postMeal({
      name: name.value,
      ingredients: ingredients,
      directions: directions
    })
      .then(meal => {
        window.location.href = '/meal-planner'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

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
          <legend>Create Meal Plan for {this.props.date}</legend>
            <div className='mealTime'>
              <label htmlFor='AddMealForm__mealTime'>
                1. Choose a meal time: 
              </label>
              <select name='mealTime' value={this.state.mealTime.value} onChange={e => this.updateMealTime(e.target.value)} className="mealTimeSelect">
                  <option value="Choose" key="Choose">Choose A Meal Time</option>
                  <option value="breakfast" key="breakfast">Breakfast</option>
                  <option value="lunch" key="lunch">Lunch</option>
                  <option value="dinner" key="dinner">Dinner</option>
                  <option value="snack" key="snack">Snack</option>
              </select>
            </div>
            <div className='recipe'>
              <label htmlFor='AddMealForm__recipe'>
                2. a. Choose a Recipe: 
              </label>
              <select name='recipeChoice' value={this.state.recipe.value} onChange={e => this.updateRecipe(e.target.value)} className="mealTimeSelect">
                  <option>Choose a Recipe</option>
                  {recipes.map(recipe => {
                    return <option value={recipe.name} key={recipe.name}>{recipe.name}</option>
                  })}              
              </select>
              <div onClick={this.handleAddMeal.bind(this)}>Add</div>
            </div>
            <p>OR</p>
            <div className='name'>
              <label htmlFor='AddRecipeForm__name'>
                2. b. Add a Recipe: 
              </label>
              <input
                name='name'
                type='text'
                required
                id='AddRecipeForm__name'
                onChange={e => this.updateName(e.target.value)}
                aria-label="Name" 
                aria-required="true"
                placeholder="name" />
              <div>Add</div>
            </div>
            <div>
              <p>Current Plan:</p>
              {this.state.breakfast.length > 0 && <p>Breakfast:</p>}
              {this.state.breakfast.length > 0 && this.state.breakfast.map(recipe => <li key={recipe}>{recipe}</li>)}
              {this.state.lunch.length > 0 && <p>Lunch:</p>}
              {this.state.lunch.length > 0 && this.state.lunch.map(recipe => <li key={recipe}>{recipe}</li>)}
              {this.state.dinner.length > 0 && <p>Dinner:</p>}
              {this.state.dinner.length > 0 && this.state.dinner.map(recipe => <li key={recipe}>{recipe}</li>)}
              {this.state.snack.length > 0 && <p>Snack:</p>}
              {this.state.snack.length > 0 && this.state.snack.map(recipe => <li key={recipe}>{recipe}</li>)}
            </div>
            <button type='submit'>Save Meal Plan</button>
  
        </form>
      </div>
    );
  }
}

export default AddRecipe;
