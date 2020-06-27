import React from 'react';
import './AddMeal.css';
import RecipesContext from '../../Context';
import PlannerApiService from '../../services/planner-api-service';
import RecipeApiService from '../../services/recipe-api-service';
import {getMeals} from '../../appHelpers';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import ValidationError from '../../ValidationError';

//form to add meals to a specific day of planner
class AddMeal extends React.Component {
  static contextType = RecipesContext
  constructor(props){
    super(props);
    const date = this.props.location.state;
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
      date: date.date,
      meals: null,
    };
  }

  componentDidMount(){
    const date = this.props.location.state.date
    const { weekPlan = [] } = this.context;

    const meals = getMeals( weekPlan, date)
    if (meals === undefined){
      this.setState({
        breakfast:[], 
        lunch:[],
        dinner:[],
        snack:[],
        meals: 'initialSetup',
      })
      return
    }
    this.setState({
      breakfast:meals.breakfast, 
      lunch:meals.lunch,
      dinner:meals.dinner,
      snack:meals.snack,
      meals:meals,
    })
  }

  componentDidUpdate(prevProps,prevState) {
    const date = this.props.location.state.date
    const { weekPlan = [] } = this.context;
  
    const meals = getMeals( weekPlan, date)
      
    if (meals !== undefined && meals !== prevState.meals) {  
      this.setState({
        breakfast:meals.breakfast, 
        lunch:meals.lunch,
        dinner:meals.dinner,
        snack:meals.snack,
        meals:meals,
      })
    }
  }

  //render meals for day
  renderCurrentPlan(weekPlan){
    const date = this.state.date
    const meals = getMeals( weekPlan, date)

    if(meals === undefined && this.state.meals === null ){return}
    
    return(
        <div>
          <p>Breakfast:</p>
              {this.state.breakfast.map(recipe => <li key={recipe}>{recipe} <div onClick={this.deleteMeal.bind(this, recipe, 'breakfast')}>delete</div></li>)}
          <p>Lunch:</p>
              {this.state.lunch.map(recipe => <li key={recipe}>{recipe} <div onClick={this.deleteMeal.bind(this, recipe, 'lunch')}>delete</div></li>)}
          <p>Dinner:</p>
              {this.state.dinner.map(recipe => <li key={recipe}>{recipe} <div onClick={this.deleteMeal.bind(this, recipe, 'dinner')}>delete</div></li>)}
          <p>Snack:</p>
              {this.state.snack.map(recipe => <li key={recipe}>{recipe} <div onClick={this.deleteMeal.bind(this, recipe, 'snack')}>delete</div></li>)}
        </div>
    )
  }
  
  //form input handlers
  updateMealTime(mealTime) {
    this.setState({mealTime: { value: mealTime, touched:true }});
  }
  updateRecipe(recipe) {
    this.setState({recipe: { value: recipe, touched:true }});
    this.setState({newRecipe: { name: "", touched:false }});
  }
  updateNewRecipeName(name) {
    this.setState({newRecipe: { name: name, touched:true }});
    this.setState({recipe: { value: '', touched:false }});
  }

  validateRecipeDoesNotExist(){
    const name = this.state.newRecipe.name.trim().toLowerCase();
    const { recipes = [] } = this.context;
    const recipe = recipes.find(recipe => recipe.name.toLowerCase() === name)

    if (recipe){
      return "Recipe name already exists"
    }
  }

  deleteMeal(recipeToDelete, time){
    if (time === 'breakfast'){
      const breakfast = this.state.breakfast
      const newRecipeList = breakfast.filter(recipe => recipe !== recipeToDelete)
      this.setState({breakfast: newRecipeList})
    } if (time === 'lunch'){
      const lunch = this.state.lunch
      const newRecipeList = lunch.filter(recipe => recipe !== recipeToDelete)
      this.setState({lunch: newRecipeList})
    }if (time === 'dinner'){
      const dinner = this.state.dinner
      const newRecipeList = dinner.filter(recipe => recipe !== recipeToDelete)
      this.setState({dinner: newRecipeList})
    }if (time === 'snack'){
      const snack = this.state.snack
      const newRecipeList = snack.filter(recipe => recipe !== recipeToDelete)
      this.setState({snack: newRecipeList})
    }
  }

  //handles adding a new recipe to database, form, & meal plan
  handleRecipeSubmit = ev => {
    ev.preventDefault()

    const name = this.state.newRecipe.name.trim().toLowerCase();
    const { recipes = [] } = this.context;
    const checkForDuplicate = recipes.find(recipe => recipe.name.trim().toLowerCase() === name)

    if(checkForDuplicate){return}

    const mealTime = this.state.mealTime.value
    const recipe = this.state.recipe.value
    const newRecipeName = this.state.newRecipe.name
    let addRecipe;
    if(mealTime === ''){
        return
    }
    else if(recipe === '' && newRecipeName === ''){
      return
    } else if(recipe === ''){
      addRecipe = newRecipeName
    } else if(newRecipeName === ''){
      addRecipe = recipe
    }

    if (mealTime === 'breakfast'){
      this.setState(state => {
        const breakfast = state.breakfast.concat(addRecipe);
        return{
          breakfast
        }
      })
    } if (mealTime === 'lunch'){
      this.setState(state => {
        const lunch = state.lunch.concat(addRecipe);
        return{
          lunch
        }
      })
    }if (mealTime === 'dinner'){
      this.setState(state => {
        const dinner = state.dinner.concat(addRecipe);
        return{
          dinner
        }
      })
    }if (mealTime === 'snack'){
      this.setState(state => {
        const snack = state.snack.concat(addRecipe);
        return{
          snack
        }
      })
    }
      
    this.setState({mealTime: { value: ''}});
    this.setState({recipe: { value: ''}});

    if(newRecipeName !== ''){
      RecipeApiService.postRecipe({
        name: newRecipeName,
        ingredients: [],
        directions: []
      })
        .then(() => {
          RecipeApiService.getRecipes()
        .then((recipes) => {
          this.context.updateRecipes(recipes)
        }).catch((err) => {
          console.error(err)
        })
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }
    this.setState({newRecipe: { name: ""}});

  }

  //handles submitting updated meal plan
  handleMealPlanSubmit = ev => {
    ev.preventDefault()

    const { date } = this.props.location.state
    const breakfast = this.state.breakfast
    const lunch = this.state.lunch
    const dinner = this.state.dinner
    const snack = this.state.snack

    PlannerApiService.postMeal({
      date: date,
      breakfast: breakfast,
      lunch: lunch,
      dinner:dinner,
      snack:snack,
    })
      .catch(res => {
        this.setState({ error: res.error })
      })

      PlannerApiService.getMeals()
        .then((meals) => {
          this.context.updateWeekPlan(meals)
        }).then(() =>
          window.location.href = '/meal-planner'
        ).catch((err) => {
          console.error(err)
        })
  }

  render(){
    const { recipes = [] } = this.context;
    const { weekPlan = [] } = this.context;
    
    return (
      <div  className="addMealCont">
        <Header />
        <Nav />
        <form className='addRecipeToMealPlanForm' onSubmit={e => this.handleRecipeSubmit(e)}>
          <legend>Create Your Meal Plan</legend>
            <div className='mealTime'>
              <label htmlFor='AddRecipeToMealPlanForm__mealTime'>
                1. Choose a meal time: 
              </label>
              <select name='mealTime' value={this.state.mealTime.value} onChange={e => this.updateMealTime(e.target.value)} className="mealTimeSelect">
                  <option value="Choose" key="Choose">Choose a Meal Time</option>
                  <option value="breakfast" key="breakfast">Breakfast</option>
                  <option value="lunch" key="lunch">Lunch</option>
                  <option value="dinner" key="dinner">Dinner</option>
                  <option value="snack" key="snack">Snack</option>
              </select>
            </div>
            <div className='recipe'>
              <label htmlFor='AddMealForm__recipe'>
                2. Choose a Recipe: 
              </label>
              <select name='recipeChoice' value={this.state.recipe.value} onChange={e => this.updateRecipe(e.target.value)} className="mealTimeSelect">
                  <option>Choose a Recipe</option>
                  {recipes.map(recipe => {
                    return <option value={recipe.name} key={recipe.name}>{recipe.name}</option>
                  })}              
              </select>
            </div>
            <p>OR</p>
            <div className='name'>
              <label htmlFor='AddRecipeForm__name'>
                Add a New Recipe Name: 
              </label>
              <input
                name='name'
                type='text'
                id='AddRecipeForm__name'
                onChange={e => this.updateNewRecipeName(e.target.value)}
                aria-label="Name" 
                value={this.state.newRecipe.name} />
                {this.state.newRecipe.touched && (<ValidationError message={this.validateRecipeDoesNotExist()} />)}
              <button type='submit'>Add Recipe to Plan</button>
            </div>
            </form>
        <form className='mealPlanForm' onSubmit={e => this.handleMealPlanSubmit(e)}>
            <legend>Current Plan for {this.state.date}</legend>
              {this.renderCurrentPlan(weekPlan)}
            <button type='submit'>Save Meal Plan</button>
        </form>
      </div>
    );
  }
}

export default AddMeal;