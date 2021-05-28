import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  

  handleClick = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  render() {
    let time = Date.now();
    let key = window.localStorage.getItem('TOKEN');
    if (key) {
      return (
        <header className="Header">
          <h1> Hoops.io </h1>
          <nav className="navlinks">
            <Link to='/' className='link'><i className="fas fa-home"></i></Link>
            <Link to='/myteam' className='link'><i className="fas fa-basketball-ball"></i></Link>
            <Link to='/auth' className='link' onClick={this.handleClick} ><i className="fas fa-sign-out-alt"></i></Link>
          </nav>
          
        </header>
      );
    } else {
      return (
        <header className='Header'>
          <h1> Hoops.io</h1>
          {/* <span>{time}</span> */}
        </header>
      );
    }
        
        
        
        
      
    
  }

}
 
export default Header;