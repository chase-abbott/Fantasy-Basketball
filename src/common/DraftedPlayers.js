import { Component } from 'react';
import './DraftedPlayers.css';

export default class DraftedPlayers extends Component {
 

  render() {
      
    const { players, player } = this.props;
   
    
    return (
      <div className="DraftedPlayers">
        <h6>{player ? player.user : ''} Team</h6>
        
        <ul >
          {players && players.map(player => {
            return <li key={player.playerId}>{player.name}</li>;
          })}
         
        </ul>
      </div>
   
    );
  }

}