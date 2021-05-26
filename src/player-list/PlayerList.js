import { Component } from 'react';
import PlayerItem from '../player-item/PlayerItem';
import './PlayerList.css';

export default class PlayerList extends Component {
  
  render() {
    const { players, onDraft } = this.props;
    return (
      <div className="PlayerList">
        {players.slice(0, 100).map(player => {
          return <PlayerItem key={player.playerId} player={player} onDraft={onDraft}/>;
        })}
      </div>
    );
  }
}