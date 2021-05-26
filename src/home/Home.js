import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getScores } from '../score-utils/score-utils';
import ScoreList from '../scores/ScoreList';
import Ticker from '../ticker/Ticker';
import './Home.css';

export default class Home extends Component {
  
  render() {
    const { scores } = this.props;
    return (
      <div className="Home">
        <Ticker/>
        <ScoreList className='scoreList' scores={scores}/>
      </div>
    );
  }

}