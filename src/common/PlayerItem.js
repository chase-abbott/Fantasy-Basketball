import { Component } from 'react';
import './PlayerItem.css';

export default class PlayerItem extends Component {
  
  render() {
    const { player, provided, reference } = this.props;
    return (
        
      <li key={player.playerId} 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        id={player.playerId} 
        ref={reference}
      >
        <h3> {player.name} </h3>
        <h4> {player.position} </h4>
        <h4> {player.fantasyPoints} </h4>
      </li>

    );
  }

}