import React from 'react';
import './EditRecipe.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import ValidationError from '../../ValidationError';
import RecipeApiService from '../../services/recipe-api-service';
import RecipesContext from '../../Context';




class EditRecipe extends React.Component {
  static contextType = RecipesContext

  constructor(props){
    super(props);
    const recipe = this.props.location.state;
    this.state = {
      name:{
        value: recipe.name,
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
      directions:recipe.directions,
      ingredients:recipe.ingredients,
      id: recipe.id,
    };
  }
  
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
  

  handleSubmit = ev => {
    ev.preventDefault()

    const checkName = this.state.name.value.trim().toLowerCase();
    const { recipes = [] } = this.context;
    const checkForDuplicate = recipes.find(recipe => recipe.name.trim().toLowerCase() === checkName)

    //make sure recipe name not duplicate
    if(checkForDuplicate && checkName !== this.props.location.state.name.trim().toLowerCase()){return}

    const { name } = ev.target
    const ingredients = this.state.ingredients
    const directions = this.state.directions
    const id = this.state.id

    const addLastIngredient = this.state.ingredientamount.value + ' - ' + this.state.ingredientname.value
    const addLastStep = this.state.step.value

    //check for ingredients and steps that user forgot in the input
    if (this.state.ingredientamount.value !== '' || this.state.ingredientname.value !== ''){
      ingredients.push(addLastIngredient)
    }
    if (this.state.step.value !== ''){
      directions.push(addLastStep)
    }

    const recipe ={
      name: name.value,
      ingredients: ingredients,
      directions: directions,
      id: id
    }
    
    RecipeApiService.updateRecipe({
      name: name.value,
      ingredients: ingredients,
      directions: directions,
      id: id
    })
    .then( RecipeApiService.getRecipes()
    .then(() => {
      this.context.updateRecipe(recipe)
    }))
      .then(() => {
        name.value = ''
        this.props.history.push(`/recipe/${id}`)}
        
      )
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

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

  deleteIngredient(ingredient){
    const ingredientToDelete = ingredient
    const currentIngredients = this.state.ingredients

    const newIngredients = currentIngredients.filter(ingredient => ingredient !== ingredientToDelete)
    this.setState({ingredients: newIngredients})
  }

  deleteStep(step){
    const stepToDelete = step
    const currentSteps = this.state.directions

    const newSteps = currentSteps.filter(step => step !== stepToDelete)
    this.setState({directions: newSteps})

  }

  render(){
   
    return (
      <div  className="addRecipePage">
        <Header />
        <Nav />
        <form className='AddRecipeForm' onSubmit={e => this.handleSubmit(e)}>
            <legend>Edit Recipe</legend>
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
                value={this.state.name.value} />
              {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
            </div>
            <div id='ingredients'>
              <h3>Ingredients</h3>
              {this.state.ingredients && this.state.ingredients.length !== 0 && <ul>{this.state.ingredients.map(ingredient=> <li key={ingredient}>{ingredient} <div onClick={this.deleteIngredient.bind(this, ingredient)}>delete</div></li>)}</ul>}
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
                    aria-label="ingredient" />
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
                    aria-label="ingredient" />
              </div>
\            </div>
            <div id="addDirectionsBtn" onClick={this.createAnotherIngredient.bind(this)}>Add Ingredient +</div>
            <div id='directions'>
              <h3>Directions</h3>
              {this.state.directions && this.state.directions.length !== 0 && <ol>{this.state.directions.map(step=> <li key={step}>{step} <div onClick={this.deleteStep.bind(this, step)}>delete</div></li>)}</ol>}
              <label htmlFor='AddRecipeForm__step'>
                Step: 
              </label>
              <input
                name='step'
                type='text'
                id='AddRecipeForm__step'
                onChange={e => this.updateStep(e.target.value)}
                value={this.state.step.value}
                aria-label="ingredient" />
            </div>
            <div id="addstepBtn" onClick={this.createAnotherStep.bind(this)}>Add Step +</div>
            <button type='submit'>Update Recipe</button>
        </form>
      </div>
    );
  }
}

export default EditRecipe;
