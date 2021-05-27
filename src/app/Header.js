import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() { 
    return (
      <header className="Header">
        <Link to='/auth'>Login/Sign Up</Link>
        <Link to='/myteam'>My Team</Link>
        <Link to='/'>Home</Link>
      </header>
    );
  }

}
 
export default Header;