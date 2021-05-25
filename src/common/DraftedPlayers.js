import { Component } from 'react';
import './DraftedPlayers.css';

export default class DraftedPlayers extends Component {
  state = {
    players: []
  }
  

  render() {
      
    const { players } = this.props;
    console.log(players);
    
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