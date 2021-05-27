import { Component } from 'react';
import { signIn, signUp } from '../auth-utils/auth-utils';
import './AuthPage.css';

export default class AuthPage extends Component {
    state = {
      isSignUp: true,
      name: '',
      email: '',
      password: '',
      error: ''
    }

  handleSwitch = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  }

  handleSubmit = async e => {
    const { isSignUp } = this.state;
    const { onUser, history } = this.props;
    e.preventDefault();
    this.setState({ error: '' });

    try { 
      const action = isSignUp ? signUp : signIn;
      const user = await action(this.state);

      onUser(user);

      history.push('/');

    }
    catch (err) {
      this.setState({ error: err.error });
    }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }
  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  }
  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  }
  
  render() {
    const { isSignUp, name, email, password, error } = this.state;
    return (
      <form className="AuthPage" onSubmit={this.handleSubmit}>
        {isSignUp && <p>
          <label>
            <span>Name: </span>
            <input name='name' value={name} required={true} onChange={this.handleNameChange}/>
          </label>
        </p>}

        <p>
          <label>
            <span>Email: </span>
            <input name='email' value={email} required={true} onChange={this.handleEmailChange}/>
          </label>
        </p>

        <p>
          <label>
            <span>Password: </span>
            <input name='password' value={password} required={true} onChange={this.handlePasswordChange}/>
          </label>
        </p>

        <p>
          <button type="submit">Sign {isSignUp ? 'Up' : 'In'}</button>
        </p>
        <p>
          <button type="button" onClick={this.handleSwitch}>{isSignUp ? 'Already Have an Account?' : 'Need an account?'}</button>
        </p>

        {error && <p>{error}</p>}
      </form>
    );
  }

}