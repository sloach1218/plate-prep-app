import React from 'react';
import { Link } from 'react-router-dom';
import './WeekPlanner.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import RecipesContext from '../../Context';
import {getWeek, getMeals} from '../../appHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



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
      
  }}
  
  componentDidMount(){
    let date = this.state.date
    if (date === null){
      date = new Date()
      this.setState({date: date})
    }

    
  }
  renderWeek(){
    let date = this.state.date
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
                    > Add Meal +</Link>
            </h2>
            {/*<button onClick={e => this.showModal(day)}>Add Meal +</button>*/}
            {this.renderMeals(day)}
          </div>
      )}
      </div>
    )
    
  }
  renderMeals(date){
    const { weekPlan = [] } = this.context;
    

    const meals = getMeals(weekPlan, date) || {};
    
    if (meals.breakfast === undefined){return}
   
    return (
      <ul>
        {meals.breakfast.length > 0 && <h3>Breakfast</h3>}
        {meals.breakfast.map(recipe =>
          <li key={recipe}>
            {recipe}
          </li>)}
      
        {meals.lunch.length > 0 && <h3>Lunch</h3>}
        {meals.lunch.map(recipe =>
          <li key={recipe}>
            {recipe}
          </li>)}
        {meals.dinner.length > 0 && <h3>Dinner</h3>}
        {meals.dinner.map(recipe =>
          <li key={recipe}>
            {recipe}
          </li>)}
        {meals.snack.length > 0 && <h3>Snack</h3>}
        {meals.snack.map(recipe =>
          <li key={recipe}>
            {recipe}
          </li>)}
      </ul>

    
    )
  }
  
  showModal = (day) => {
    this.setState({
      show: !this.state.show,
      addMealDate: day
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
          {this.state.date && this.renderWeek()}
        </div>
      </div>
    );
  }
}

export default WeekPlanner;
