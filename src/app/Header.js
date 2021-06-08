import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  
  render() {
    // elevate this work back up to app
    const { isSignedIn, onSignOut } = this.props;

    return (
        <header className="Header">
          <h1> Hoops.io </h1>

          {isSignedIn &&
            <nav className="navlinks">
              <Link to='/' className='link'>
                <i className="fas fa-home"></i>
              </Link>
              <Link to='/my-team' className='link'>
                <i className="fas fa-basketball-ball"></i>
              </Link>
              <Link to='#' className='link' onClick={onSignOut} >
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            </nav>
          }

        </header>
      );  
  }

}
 
export default Header;