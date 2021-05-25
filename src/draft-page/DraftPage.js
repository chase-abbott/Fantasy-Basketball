import { Component } from 'react';
import './DraftPage.css';
import request from 'superagent';
import PlayerList from '../player-list/PlayerList';
import PlayerSearch from '../search/PlayerSearch';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIxOTAyODU4fQ.tRu7bBBANIKuKyhArWA9RQe_0QotG8hD8K3KXm3q0eo';
//To utils folder:
async function getPlayers() {
  const response = await request.get('api/players')
    .set('Authorization', TOKEN);
  return response.body;
}

async function favoritePlayer(player) {
  const response = await request.post('/api/me/players')
    .set('Authorization', TOKEN)
    .send(player);
  return response.body;
}

//
export default class DraftPage extends Component {
  state = {
    players: [],
    search: '',
    draftedPlayers: []
  }
  
  async componentDidMount() {
    const { draftedPlayers } = this.state;
    const playersFromApi = await getPlayers();
 
    const players = playersFromApi.sort((a, b) => {
      return b.fantasyPoints - a.fantasyPoints;
    });
    const updatedPlayers = players.map((player) => {
      const matchingPlayer = draftedPlayers.find(drafted => drafted.playerId === player.playerId);
          //find returns undefined if no match is found!!!!

          //if match return match, else return player
      return matchingPlayer ? matchingPlayer : player;
    });
    this.setState({ players: updatedPlayers });

  }
  handleSearch = (search) => {
    const { players } = this.state;
    const aRegex = new RegExp(search, 'i');
    const searchedPlayer = players.filter(player => {
      return player.name.match(aRegex);
    }).sort((a, b) => {
      return b.fantasyPoints - a.fantasyPoints;
    });
    console.log(searchedPlayer);
    if (searchedPlayer.length > 0){
      this.setState({ players: searchedPlayer });
    } else return;

    

  }

  handleDraft = async (player) => {
    const { draftedPlayers, players } = this.state;
    await favoritePlayer(player);
    player.hasBeenDrafted = true;
    const updatedDrafted = [...draftedPlayers, player];
    const updatedPlayers = players.map(p => {
      return p.playerId === player.playerId ? player : p;
    });
    this.setState({ players: updatedPlayers, draftedPlayers: updatedDrafted });
    
  };
  render() {
    return (
      <div className="DraftPage">
        <PlayerSearch onSearch={this.handleSearch}/>
        <PlayerList players={this.state.players} onDraft={this.handleDraft}/>
      </div>
    );
  }

}