import { Component } from 'react';
import './ScoreItem.css';

export default class ScoreItem extends Component {
  
  render() {
    const { score } = this.props;
    
    return (
      <li className="ScoreItem">
      
        <h2 className='homeTeam'>{score.homeTeam}: <span>{score.homeScore}</span></h2> 
        <h2 className='status'>{score.status}</h2>
        {!score.isOver && <h2 className='quarter'>QTR: {score.quarter} <br></br>
          {score.minutes}:{score.seconds}</h2>}
        
        <h2 className='awayTeam'>{score.awayTeam}: <span>{score.awayScore}</span></h2>
        <h2>Projected Spread: {(Math.round(score.spread * 2) / 2).toFixed(1)}</h2>
        <h2>Projected Over/Under: {Math.floor(score.overUnder)}</h2>
      </li>
    );
  }
}