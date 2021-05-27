import { Component } from 'react';
import ScoreList from '../scores/ScoreList';
import VideoList from '../video-folder/VideoList';
import Ticker from '../ticker/Ticker';
import './Home.css';

export default class Home extends Component {
  handleClick = () => {
    let click = window.confirm('Heading to the draft will delete your current team. Continue?');
    if (click === true) {
      window.location = '/draft';
    }
    
  }
  
  render() {
    const { scores } = this.props;
    return (
      <div className="Home">
        <Ticker/>
        <ScoreList className='scoreList' scores={scores}/>
        <div className='draftLink' onClick={this.handleClick}>DRAFT TIME
        </div>
        {/* <VideoList/> */}
      </div>
    );
  }
}