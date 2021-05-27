import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  handleClick = () => {
    window.localStorage.clear();
    window.location.reload();
  }



  render() { 
    let key = window.localStorage.getItem('TOKEN');
    if (key) {
      return (
        <header className="Header">
          <Link to='/myteam' > My Team</Link>
          <Link to='/auth' onClick={this.handleClick}>Sign Out</Link>
          <Link to='/'>Home</Link>
        </header>
      );
    } else {
      return (
        <header className='Header'>
          FANTASY BASKETBALL DRAFT
        </header>
      );
    }
        
        
        
        
      
    
  }

}
 
export default Header;