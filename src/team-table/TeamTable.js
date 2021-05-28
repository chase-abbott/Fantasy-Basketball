import { Component } from 'react';
import request from 'superagent';
import './TeamTable.css';

export default class TeamTable extends Component {
  state = {
    startingFive: {}
  }

  componentDidMount = async () => {
    const userTeam = await request
      .get('/api/me/team')
      .set('Authorization', window.localStorage.getItem('TOKEN'));

    this.setState({ startingFive: userTeam.body.startingFive });
  }
  
  render() {
    const { startingFive } = this.state;
    return (
      <div className="TeamTable">
        <ul>
          {startingFive.map(player => {
            return <li key={player.id} className="player">
              <h6> {player.name} </h6>
              <h6> {player.position} </h6>
              <h6> {player.fantasyPoints} </h6>
            </li>;
          })}
        </ul>
      </div>
    );
  }

}