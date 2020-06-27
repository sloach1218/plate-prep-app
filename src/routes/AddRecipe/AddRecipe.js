import React from 'react';
import './AddRecipe.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import ValidationError from '../../ValidationError';
import RecipeApiService from '../../services/recipe-api-service';
import RecipesContext from '../../Context';

//form to add a recipe
class AddRecipe extends React.Component {
  static contextType = RecipesContext

  constructor(props){
    super(props);
    this.state = {
      name:{
        value: "",
        touched: false
      },
      ingredientamount:{
        value: "",
        touched:false
      },
      ingredientname:{
        value: "",
        touched:false
      },
      step:{
        value: "",
        touched:false
      },
      directions:[],
      ingredients:[],
    };
  }

  //form input handlers
  updateName(name) {
    this.setState({name: { value: name, touched:true }});
  }
  updateStep(step) {
    this.setState({step: { value: step, touched:true }});
  }
  updateIngredientName(ingredientname) {
    this.setState({ingredientname: { value: ingredientname, touched:true }});
  }
  updateIngredientAmount(ingredientamount) {
    this.setState({ingredientamount: { value: ingredientamount, touched:true }});
  }

  //form validation
  validateName(){
    const name = this.state.name.value.trim().toLowerCase();;
    if (name.length === 0){
      return "Name is required"
    } else if(name.length < 2){
      return "Name must be at least 2 characters long"
    }

    const { recipes = [] } = this.context;
    const recipe = recipes.find(recipe => recipe.name.toLowerCase() === name)

    if (recipe){
      return "Recipe name already exists"
    }
  }
  
  //form submit handler
  handleSubmit = ev => {
    ev.preventDefault()
    const { name } = ev.target
    const ingredients = this.state.ingredients
    const directions = this.state.directions
    
    //make sure recipe name not duplicate
    const checkName = this.state.name.value.trim().toLowerCase();
    const { recipes = [] } = this.context;
    const checkForDuplicate = recipes.find(recipe => recipe.name.trim().toLowerCase() === checkName)
    if(checkForDuplicate){return}

    const addLastIngredient = this.state.ingredientamount.value + ' - ' + this.state.ingredientname.value
    const addLastStep = this.state.step.value

    //check for ingredients and steps that user forgot in the input fields
    if (this.state.ingredientamount.value !== '' || this.state.ingredientname.value !== ''){
      ingredients.push(addLastIngredient)
    }
    if (this.state.step.value !== ''){
      directions.push(addLastStep)
    }
    
    RecipeApiService.postRecipe({
      name: name.value,
      ingredients: ingredients,
      directions: directions
    })
      .then(recipe => {
        name.value = ''
        window.location.href = '/home'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

  }

  //adds ingredient to state ingredients array and clears input fields
  createAnotherIngredient(){
    const amount = this.state.ingredientamount.value;
    const name = this.state.ingredientname.value;
    const newIngredient = amount + ' - ' + name
    if(name === ''){

    } else{this.setState(state => {
      const ingredients = state.ingredients.concat(newIngredient);
      return{
        ingredients
      }
    })
    this.setState({ingredientamount: { value: ''}});
    this.setState({ingredientname: { value: ''}});}
  }

  //adds step to state directions array and clears input field
  createAnotherStep(){
    if(this.state.step.value === ''){

    } else{
      this.setState(state => {
        const directions = state.directions.concat(state.step.value);
        return{
          directions
        }
      })
      this.setState({step: { value: ''}});
    }
  }

  render(){
    return (
      <div  className="addRecipePage">
        <Header />
        <Nav />
        <form className='AddRecipeForm' onSubmit={e => this.handleSubmit(e)}>
            <legend>Add New Recipe</legend>
            <div className='name'>
              <label htmlFor='AddRecipeForm__name'>
                Name: 
              </label>
              <input
                name='name'
                type='text'
                required
                id='AddRecipeForm__name'
                onChange={e => this.updateName(e.target.value)}
                aria-label="Name" 
                aria-required="true"
                tabindex="1" />
              {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
            </div>
            <div id='ingredients'>
              <h3>Ingredients</h3>
              {this.state.ingredients && this.state.ingredients.length !== 0 && <ul>{this.state.ingredients.map(ingredient=> <li key={ingredient}>{ingredient}</li>)}</ul>}
              <div className="AddRecipeForm__ingredient_amount">
                  <label htmlFor='AddRecipeForm__ingedients' >
                    Amount: 
                  </label>
                    <input
                    name='ingredient_amount'
                    type='text'
                    id='AddRecipeForm__ingredient_amount'
                    onChange={e => this.updateIngredientAmount(e.target.value)}
                    value={this.state.ingredientamount.value}
                    aria-label="ingredient amount"
                    tabindex="2" />
              </div>
              <div className="AddRecipeForm__ingredient_name">
                  <label htmlFor='AddRecipeForm__ingedients' >
                    Name: 
                  </label>
                  <input
                    name='ingredient_name'
                    type='text'
                    id='AddRecipeForm__ingredient_name'
                    onChange={e => this.updateIngredientName(e.target.value)}
                    value={this.state.ingredientname.value}
                    aria-label="ingredient name"
                    tabindex="3" />
              </div>
            </div>
            <div id="addDirectionsBtn" onClick={this.createAnotherIngredient.bind(this)}  tabindex="4">+ Add Ingredient</div>
            <div id='directions'>
              <h3>Directions</h3>
              {this.state.directions && this.state.directions.length !== 0 && <ol>{this.state.directions.map(step=> <li key={step}>{step}</li>)}</ol>}
              <label htmlFor='AddRecipeForm__step'>
                Step: 
              </label>
              <input
                name='step'
                type='text'
                id='AddRecipeForm__step'
                onChange={e => this.updateStep(e.target.value)}
                value={this.state.step.value}
                aria-label="step"
                tabindex="5" />
            </div>
            <div id="addstepBtn" onClick={this.createAnotherStep.bind(this)}  tabindex="6">+ Add Step</div>
            <button type='submit'  tabindex="7">Add Recipe</button>
        </form>
      </div>
    );
  }
}

export default AddRecipe;