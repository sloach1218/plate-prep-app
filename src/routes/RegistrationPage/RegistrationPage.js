import React from 'react';
import './RegistrationPage.css';
import ValidationError from '../../ValidationError';
import AuthApiService from '../../services/auth-api-service'



class RegistrationPage extends React.Component {
  
  
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
      reenterPassword:{
        value: "",
        touched:false
      },
      error:null,
    };
  }
  updateUsername(username) {
    this.setState({username: { value: username, touched:true }});
  }
  updatePassword(password) {
    this.setState({password: { value: password, touched:true }});
  }
  updateReenterPassword(reenterPassword) {
    this.setState({reenterPassword: { value: reenterPassword, touched:true }});
  }

  validateUsername(){
    const username = this.state.username.value.trim();
    if (username.length === 0){
      return "Username is required"
    } else if(username.length < 5){
      return "Username must be at least 5 characters long"
    }
  }
  validatePassword(){
    const password = this.state.password.value.trim();
    if(password.length === 0){
      return "Password is required";
    } else if ( password.length < 8){
      return "Password must be at least 8 characters long"
    }
  }
  validateReenterPassword(){
    const password = this.state.reenterPassword.value.trim();
    const firstEntry = this.state.password.value.trim();
    if(password.length === 0){
      return "Please enter password again";
    } else if (firstEntry !== password){
      return "entry does not match"
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: username.value,
      password: password.value,
    })
      .then(user => {
        username.value = ''
        password.value = ''
        const { history } = this.props
        history.push('/')
      })
      .catch(res => {
        this.setState({ error: res.error })
        console.log(this.state.error)
      })
  }

  render(){
    
    return (
      <div className="registrationPage"> 
        <header>
          <h1>Plate Prep</h1>
        </header>
        <form className='RegistrationForm'  onSubmit={e => this.handleSubmit(e)}>
            <div className='RegistrationForm__error' role='alert'>
            </div>
            <legend>Create an Account</legend>
            <div className='username'>
              <label htmlFor='RegistrationForm__username'>
                Username: 
              </label>
              <input
                name='username'
                type='text'
                required
                id='RegistrationForm__username'
                onChange={e => this.updateUsername(e.target.value)}
                aria-label="username" 
                aria-required="true" />
              {this.state.username.touched && (<ValidationError message={this.validateUsername()} />)}
            </div>
            <div className='password'>
              <label htmlFor='RegistrationForm__password'>
                Password: 
              </label>
              <input
                name='password'
                type='password'
                required
                id='RegistrationForm__password'
                onChange={e => this.updatePassword(e.target.value)}
                aria-label="password" 
                aria-required="true" />
              <p>Password must be at least 8 characters and contain one upper case, lower case, number and special character.</p>
              {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
            </div>
            <div className='reenterPassword'>
              <label htmlFor='RegistrationForm__reenterPassword'>
                Re-enter Password: 
              </label>
              <input
                name='reenterPassword'
                type='password'
                required
                id='RegistrationForm__reenterPassword'
                onChange={e => this.updateReenterPassword(e.target.value)}
                aria-label="reenter Password" 
                aria-required="true" />
              {this.state.reenterPassword.touched && (<ValidationError message={this.validateReenterPassword()} />)}
            </div>
            <button type='submit' disabled={this.validateUsername() || this.validatePassword() || this.validateReenterPassword()}>Create Account</button>
  
        </form>
      </div>
    );
  }
}

export default RegistrationPage;
