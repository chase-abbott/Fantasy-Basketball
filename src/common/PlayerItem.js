import { Component } from 'react';
import './PlayerItem.css';

export default class PlayerItem extends Component {

  render() {
    const { player, provided, reference } = this.props;
    return (

      <li key={player.playerId}
        className={`PlayerItem ${player.position}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        id={player.playerId}
        ref={reference}

      >
        <h3> {player.name} </h3>
        <h4> Position: {player.position} </h4>
        <h4> {player.fantasyPoints} Fantasy PPG</h4>
      </li >

    );
  }

}