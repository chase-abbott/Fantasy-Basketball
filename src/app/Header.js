import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  

  handleClick = async () => {
    window.localStorage.clear();
    this.forceUpdate();
  }

  render() {
    let time = Date.now();
    let key = window.localStorage.getItem('TOKEN');
    if (key) {
      return (
        <header className="Header">
          <Link to='/' className='link'><i className="fas fa-basketball-ball"></i></Link>
          <Link to='/myteam' className='link'>My Team</Link>
          <Link to='/auth' className='link' onClick={this.handleClick} ><i className="fas fa-sign-out-alt"></i></Link>
          
        </header>
      );
    } else {
      return (
        <header className='Header'>
          <span>FANTASY BASKETBALL DRAFT</span>
          {/* <span>{time}</span> */}
        </header>
      );
    }
        
        
        
        
      
    
  }

}
 
export default Header;