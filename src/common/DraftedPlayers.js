import { Component } from 'react';
import './DraftedPlayers.css';

export default class DraftedPlayers extends Component {
 

  render() {
      
    const { players, user } = this.props;
   
    
    return (
      <div className="DraftedPlayers">
        <h6>{user ? user.userName : ''} Team</h6>
        
        <ul >
          {players && players.map(player => {
            return <li key={player.playerId}>{player.name}</li>;
          })}
         
        </ul>
      </div>
   
    );
  }

}