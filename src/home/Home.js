import { Component } from 'react';
import { Link } from 'react-router-dom';
import ScoreList from '../scores/ScoreList';
import VideoList from '../video-folder/VideoList';
import Ticker from '../ticker/Ticker';
import './Home.css';

export default class Home extends Component {
  
  render() {
    const { scores } = this.props;
    return (
      <div className="Home">
        <Ticker/>
        <ScoreList className='scoreList' scores={scores}/>
        <div className='draftLink'>
          <Link to='/draft'>Click here to enter your draft</Link>
        </div>
        <VideoList/>
      </div>
    );
  }

}