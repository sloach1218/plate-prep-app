import React from 'react';
import './WeekPlanner.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipesContext from '../../Context';
import {getWeek, getMeals} from '../../appHelpers';
import AddMeal from '../../components/AddMeal/AddMeal';


class HomePage extends React.Component {
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
      show: false,
      date:null,
      
  }}
  
  renderWeek(){
    let date = this.state.date
    if (date === null){
       date = new Date()
       this.setState({date: date})
    }
    const week = getWeek(date);

    
    return (
      <div>
        <div className="weekControls">
          <button onClick={this.getPreviousWeek.bind(this)}>Last Week</button>
          <button onClick={this.getNextWeek.bind(this)}>Next Week</button>
        </div>
        {week.map(day =>
          <div key={day} className="dayCont">
            <h2>{day}</h2>
            <button onClick={e => this.showModal()}>Add Meal +</button>
            <ul>{this.renderMeals(day)}</ul>
          </div>
      )}
      </div>
    )
    
  }
  renderMeals(date){
    const { weekPlan = [] } = this.context;
    

    const meals = getMeals(weekPlan, date) || {};

    if (meals.recipes === undefined){return}
   
    return meals.recipes.map(recipe =>
      <li key={recipe}>
        {recipe}
      </li>
    )
  }
  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };
  
  getNextWeek(){
      let date = this.state.date;
      const nextWeek = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      this.setState({date: nextWeek})
  }
  getPreviousWeek(){
    let date = this.state.date;
    const lastWeek = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    this.setState({date: lastWeek})
}
 
  
  

  render(){
    
    return (
      <div>
        <Header />
        <Nav />
        
        <div className="weekPlannerContainer">
          {this.renderWeek()}
        </div>
        <AddMeal onClose={this.showModal} show={this.state.show} />
      </div>
    );
  }
}

export default HomePage;
