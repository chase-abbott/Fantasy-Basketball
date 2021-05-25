import { Component } from 'react';
import { Link } from 'react-router-dom';
import Ticker from '../ticker/Ticker';
import './Home.css';

export default class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <h2>Home Page</h2>
        <Ticker/>

        <Link to='/auth'>Click Here To Sign In or Sign Up!</Link>

      </div>
    );
  }

}