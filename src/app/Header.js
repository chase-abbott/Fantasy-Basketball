import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  handleClick = async () => {
    window.localStorage.clear();
    this.forceUpdate();
  }

  render() { 
    let key = window.localStorage.getItem('TOKEN');
    if (key) {
      return (
        <header className="Header">
          <Link to='/' className='link'><i class="fas fa-basketball-ball"></i></Link>
          <Link to='/myteam' className='link'>My Team</Link>
          <Link to='/auth' className='link' onClick={this.handleClick} ><i class="fas fa-sign-out-alt"></i></Link>
          
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