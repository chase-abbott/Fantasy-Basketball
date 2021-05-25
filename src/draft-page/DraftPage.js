import { Component } from 'react';
import './DraftPage.css';
import request from 'superagent';
import PlayerList from '../player-list/PlayerList';
import PlayerSearch from '../search/PlayerSearch';
import DraftedPlayers from '../common/DraftedPlayers';
import { socketEmitChange, socketLogIn, socketOnChange, socketOtherLogIn } from '../socket-utils/socket-utils.js';
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
    draftedPlayers: [],
    user1Drafted: [],
    user2Drafted: [],
    user3Drafted: [],
    user: window.localStorage.getItem('USER_NAME'),
    users: []
  }
 //userName and id as props
  async componentDidMount() {
    socketLogIn(this.state.user);
    socketOtherLogIn((users) => this.setState({ users: users }));
    const { draftedPlayers, users } = this.state;
 
    socketOnChange((draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted) => this.setState({ draftedPlayers: draftedPlayers, user1Drafted: userOneDrafted, user2Drafted: userTwoDrafted, user3Drafted: userThreeDrafted }));
    // console.log(this.state.draftedPlayers);
    const userOneDrafted = draftedPlayers.filter(player => {
     
      return player.userName === users[0].user;
            
    });
    const userTwoDrafted = draftedPlayers.filter(player => {
      return player.userName === users[1].user;
            
    });
    const userThreeDrafted = draftedPlayers.filter(player => {
      return player.userName === users[2].user;
            
    });
     //update players to change button state too

    const playersFromApi = await getPlayers();

    const players = playersFromApi.sort((a, b) => {
      return b.fantasyPoints - a.fantasyPoints;
    });
    const updatedPlayers = players.map((player) => {
      const matchingPlayer = draftedPlayers.find(drafted => drafted.playerId === player.playerId);
      return matchingPlayer ? matchingPlayer : player;
    });

    this.setState({ players: updatedPlayers, user1Drafted: userOneDrafted, user2Drafted: userTwoDrafted, user3Drafted: userThreeDrafted });
  

  }
  handleSearch = (search) => {
    const { players } = this.state;
    
    const aRegex = new RegExp(search, 'i');
    const searchedPlayer = players.filter(player => {
      return player.name.match(aRegex);
    }).sort((a, b) => {
      return b.fantasyPoints - a.fantasyPoints;
    });
   
    if (searchedPlayer.length > 0){
      this.setState({ players: searchedPlayer });
    } else return;

    

  }

  handleDraft = async (player) => {
    const { draftedPlayers, players, users, user } = this.state;
    await favoritePlayer(player);
    player.hasBeenDrafted = true;
    player.userName = user;
    const updatedDrafted = [...draftedPlayers, player];
    console.log(updatedDrafted);
    const updatedPlayers = players.map(p => {
      return p.playerId === player.playerId ? player : p;
    });
    

    const userOneDrafted = updatedDrafted.filter(player => {
     
      return player.userName === users[0].user;
            
    });
    const userTwoDrafted = updatedDrafted.filter(player => {
      return player.userName === users[1].user;
            
    });
    const userThreeDrafted = updatedDrafted.filter(player => {
      return player.userName === users[2].user;
            
    });
    socketEmitChange(player);
    this.setState({ players: updatedPlayers, draftedPlayers: updatedDrafted, user1Drafted: userOneDrafted, user2Drafted: userTwoDrafted, user3Drafted: userThreeDrafted });
    
    
  };
  render() {
    const { user1Drafted, user2Drafted, user3Drafted, users } = this.state;
    return (
      <div className="DraftPage">
        <PlayerSearch onSearch={this.handleSearch}/>
        <PlayerList players={this.state.players} onDraft={this.handleDraft}/>
        <DraftedPlayers players={user1Drafted} player={users[0]}/>
        <DraftedPlayers players={user2Drafted} player={users[1]}/>
        <DraftedPlayers players={user3Drafted} player={users[2]}/>
    
        
      </div>
    );
  }

}