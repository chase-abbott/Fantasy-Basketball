import { Component } from 'react';
import './ScoreItem.css';

export default class ScoreItem extends Component {
  
  render() {
    const { score } = this.props;
    return (
      <li className="ScoreItem">
        <h2 className='homeTeam'>{score.homeTeam}: <span>{score.homeScore}</span></h2> 
        <h2 className='status'>{score.status}</h2>
        <h2 className='quarter'>QTR: {score.quarter}</h2>
        <h2 className='time'>{score.minutes}:{score.seconds}</h2>
        <h2 className='awayTeam'>{score.awayTeam}: <span>{score.awayScore}</span></h2>
        <h2>Projected Spread: {score.spread}</h2>
        <h2>Projected Over/Under: {score.overUnder}</h2>
        
      </li>
    );
  }

}