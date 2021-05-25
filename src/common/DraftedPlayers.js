import { Component } from 'react';
import './DraftedPlayers.css';

export default class DraftedPlayers extends Component {
 

  render() {
      
    const { players } = this.props;
   
    
    return (
      <div className="DraftedPlayers">
        <h1>Teams</h1>
        
        <ul >
          {players && players.map(player => {
            return <li key={player.playerId}>{player.name}</li>;
          })}
         
        </ul>
      </div>
   
    );
  }

}