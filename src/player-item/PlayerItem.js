import { Component } from 'react';
import './PlayerItem.css';

export default class PlayerItem extends Component {
  state = {
    isDrafted: this.props.player.hasBeenDrafted
  }
  
  handleDraftClick = async (player) => {
    await this.props.onDraft(player);
    this.setState({ isDrafted: this.props.player.hasBeenDrafted });
  }

  render() {
    const { player } = this.props;
    const { isDrafted } = this.state;
    return (
      <div className="PlayerItem">
        <p>Name: {player.name} </p>
        <p>position {player.position}</p>
        <p>Points: {player.fantasyPoints}</p>
        <button disabled={isDrafted} onClick={() => this.handleDraftClick(player)}>
          {isDrafted ? 'selected' : 'pick'}
        </button>  
      </div>
    );
  }

}