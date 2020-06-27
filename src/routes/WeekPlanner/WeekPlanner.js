import React from 'react';
import { Link } from 'react-router-dom';
import './WeekPlanner.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipesContext from '../../Context';
import {getWeek, getMeals} from '../../appHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

//component handles rendering a week of planner at a time
class WeekPlanner extends React.Component {
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
      addMealDate:'',
      meals: [],
    }
  }
  
  componentDidMount(){
    let date = this.state.date;
    if (date === null){
      date = new Date()
      this.setState({date: date})
    }
  }

  //gets current day, then returns entire week starting with Monday
  renderWeek(){
    let date = this.state.date;
    const week = getWeek(date);
    
    return (
      <div>
        <div className="weekControls">
          <button onClick={this.getPreviousWeek.bind(this)}><FontAwesomeIcon icon={faChevronLeft} className="icon"/> Last Week</button>
          <button onClick={this.getNextWeek.bind(this)}>Next Week <FontAwesomeIcon icon={faChevronRight} className="icon"/></button>
        </div>
        {week.map(day =>
          <div key={day} className="dayCont">
            <h2>{day}
              <Link 
                    to={{
                      pathname:`/add-meal`,
                      state: {
                        date: day,
                      }
                    }}
                    className='addMealBtn'
                    >+ Add Meal</Link>
            </h2>
            {this.renderMeals(day)}
          </div>
        )}
      </div>
    )
  }

  //checks for any existing meals for each day in the weekPlan and then renders them if they exist
  renderMeals(date){
    const { weekPlan = [] } = this.context;
    const meals = getMeals(weekPlan, date) || {};
    
    if (meals.breakfast === undefined){return}

    return (
      <ul>
        {meals.breakfast.length > 0 && <li>
          <h3>Breakfast</h3>
          <ul>
              {meals.breakfast.map(recipe =>
              <li key={recipe}>
                {recipe}
              </li>)}
          </ul>
        </li>}
        {meals.lunch.length > 0 && <li>
          <h3>Lunch</h3>
          <ul>
            {meals.lunch.map(recipe =>
            <li key={recipe}>
              {recipe}
            </li>)}
          </ul>
        </li>}
        {meals.dinner.length > 0 && <li>
          <h3>Dinner</h3>
          <ul>
              {meals.dinner.map(recipe =>
              <li key={recipe}>
                {recipe}
              </li>)}
          </ul>
        </li>}
        {meals.snack.length > 0 && <li>
          <h3>Snack</h3>
          <ul>
            {meals.snack.map(recipe =>
            <li key={recipe}>
              {recipe}
            </li>)}
          </ul>
        </li>}
      </ul>
    )
  }
  
  //updates date in state to 7 days from current date in state
  getNextWeek(){
      let date = this.state.date;
      const nextWeek = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      this.setState({date: nextWeek})
  }
  //updates date in state to 7 days before current date in state
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
          {this.state.date && this.renderWeek()}
        </div>
      </div>
    );
  }
}

export default WeekPlanner;