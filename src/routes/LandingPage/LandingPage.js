import React from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';
import ValidationError from '../../ValidationError';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';



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
  updateUsername(username) {
    this.setState({username: { value: username, touched:true }});
  }
  updatePassword(password) {
    this.setState({password: { value: password, touched:true }});
  }

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
        <header>
          <h1>Plate Prep</h1>
        </header>
        
        <section className="appDescrip">
          
          <h3>Tagline</h3>
          <p>Description</p>
          <Link to={`/register`} className='registerBtn'>Create an Account</Link>
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
      </main>

    );
  }
}

export default LandingPage;
