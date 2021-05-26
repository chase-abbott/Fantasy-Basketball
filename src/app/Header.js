import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  handleLogOut = () => {
    window.localStorage.clear();
    window.location.reload();
  }
  render() { 
    return (
      <header className="Header">
        <Link to='/auth'>Login/Sign Up</Link>
        <Link to='/draft'>Click here to enter your draft</Link>
        <Link to='/myteam'>My Team</Link>
        <Link to='/auth' onClick={this.handleLogOut}>Log Out</Link>
      </header>
    );
  }

}
 
export default Header;
//