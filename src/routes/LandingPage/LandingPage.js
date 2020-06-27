import React from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';
import ValidationError from '../../ValidationError';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faList, faCalendarAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/pp_icon_solid.png';

//landing page for a user who is not logged in
class LandingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:{
        value: "",
        touched: false
      },
      password:{
        value: "",
        touched:false
      },
      error: null
    };
  }

  //form input handlers
  updateUsername(username) {
    this.setState({username: { value: username, touched:true }});
  }
  updatePassword(password) {
    this.setState({password: { value: password, touched:true }});
  }

  //form validation
  validateUsername(){
    const username = this.state.username.value.trim();
    if (username.length === 0){
      return "Username is required"
    } 
  }
  validatePassword(){
    const password = this.state.password.value.trim();
    if(password.length === 0){
      return "Password is required";
    }
  }

  //form submit handler
  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error:null })
    const { username, password } = ev.target

    AuthApiService.postLogin({
      user_name: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        window.location.href = '/home'
      })
      .catch(res => {
        this.setState({ error:res.error})
      })
  }

  render(){
    return (
      <main className="landingPageMain">
        <section className="appDescrip">
          <img src={logo} className="logo" alt="logo icon"/>
          <h1>Plate Prep</h1>
          <p>Keep your recipes and weekly meal plan all together in one easy to use app!</p>
          <ul className="whyThisAppRocks">
            <li><FontAwesomeIcon icon={faList} className="icon"/><br></br>Save<br></br>Recipes</li>
            <li><FontAwesomeIcon icon={faCalendarAlt} className="icon"/><br></br>Plan Your<br></br>Week</li>
            <li><FontAwesomeIcon icon={faSyncAlt} className="icon"/><br></br>Reuse and<br></br>Update</li>            
          </ul>
          <Link to={`/register`} className='registerBtn'>Create Account <FontAwesomeIcon icon={faChevronRight} className="icon"/></Link>
        </section>
        <section>
            <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
              <legend>Already have an account?</legend>
              <label htmlFor="username" >Username:</label>
              <input 
                  type="text"
                  name="username"
                  id="username"
                  onChange={e => this.updateUsername(e.target.value)}
                  aria-label="username" 
                  aria-required="true" />
              {this.state.username.touched && (<ValidationError message={this.validateUsername()} />)}
              <label htmlFor="password" >Password:</label>
              <input 
                  type="password" 
                  name="password" 
                  id="password"
                  onChange={e => this.updatePassword(e.target.value)}
                  aria-label="password" 
                  aria-required="true" />
              {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
              <button type="submit" disabled={this.validateUsername() || this.validatePassword()}>Login</button>
            </form>
        </section>
        <section className="demoUserCredentials">
          <p>If you would like to try a demo first,<br></br>please login above using the following credentials:</p>
          <p>username: Demo_User</p>
          <p>password: Password1!</p>
        </section>
      </main>
    );
  }
}

export default LandingPage;