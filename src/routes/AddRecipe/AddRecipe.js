import React from 'react';
import './AddRecipe.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import ValidationError from '../../ValidationError';


class AddRecipe extends React.Component {
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
    const name = this.state.name.value.trim();
    if (name.length === 0){
      return "Name is required"
    } else if(name.length < 2){
      return "Name must be at least 2 characters long"
    }
  }
  

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('submitted')

  }

  createAnotherIngredient(){
    const amount = this.state.ingredientamount.value;
    const name = this.state.ingredientname.value;
    const newIngredient = [{"name":name, "amount":amount}]
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

  render(){
    return (
      <div  className="addRecipePage">
        <Header />
        <Nav />
        <form className='AddRecipeForm' onSubmit={e => this.handleSubmit(e)}>
            <legend>Add a new recipe</legend>
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
                aria-required="true" />
              {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
            </div>
            <div id='ingredients'>
              <h3>Ingredients</h3>
              {this.state.ingredients && this.state.ingredients.length !== 0 && <ul>{this.state.ingredients.map(ingredient=> <li key={ingredient.name}>{ingredient.amount} - {ingredient.name}</li>)}</ul>}
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
                
            </div>
            <div id="addDirectionsBtn" onClick={this.createAnotherIngredient.bind(this)}>Add Ingredient +</div>
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
                aria-label="ingredient" />
            </div>
            <div id="addstepBtn" onClick={this.createAnotherStep.bind(this)}>Add Step +</div>
            <button type='submit'>Add Recipe</button>
  
        </form>
      </div>
    );
  }
}

export default AddRecipe;
