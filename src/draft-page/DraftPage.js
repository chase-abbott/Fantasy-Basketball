import { Component } from 'react';
import './DraftPage.css';
import request from 'superagent';
import PlayerList from '../player-list/PlayerList';
import PlayerSearch from '../search/PlayerSearch';
import DraftedPlayers from '../common/DraftedPlayers';
import { socketEmitChange, socketLogIn, socketOnChange, socketOtherLogIn, socketOnStart, socketCurrentPlayer } from '../socket-utils/socket-utils.js';
const TOKEN = window.localStorage.getItem('TOKEN');
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
    users: [],
    currentPlayer: '',
    time: 0,
    loggedIn: false
  }
 //userName and id as props
  async componentDidMount() {
    const { draftedPlayers } = this.state;
    const token = window.localStorage.getItem('TOKEN');

    // added by Chase, deletes current user players, teams from db

    const myPlayers = await request
      .get('/api/me/players')
      .set('Authorization', window.localStorage.getItem('TOKEN'));


    if (myPlayers.body[1]){

      await request
        .delete(`/api/me/players/${window.localStorage.getItem('USER_ID')}`)
        .set('Authorization', token);
        
      await request
        .delete(`/api/me/team/${window.localStorage.getItem('USER_ID')}`)
        .set.set('Authorization', token);

    }

    socketOnStart((user, interval, time) => {
      this.setState({ currentPlayer: user, time: time });
    
    });
    socketCurrentPlayer((user) => {this.setState({ currentPlayer: user });});
    socketOtherLogIn((users) => this.setState({ users: users }));
    
 
    socketOnChange((draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted) => this.setState({ draftedPlayers: draftedPlayers, user1Drafted: userOneDrafted, user2Drafted: userTwoDrafted, user3Drafted: userThreeDrafted }));
  
//comment
    const playersFromApi = await getPlayers();

    const players = playersFromApi.sort((a, b) => {
      return b.fantasyPoints - a.fantasyPoints;
    });
    const updatedPlayers = players.map((player) => {
      const matchingPlayer = draftedPlayers.find(drafted => drafted.playerId === player.playerId);
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
   
    if (searchedPlayer.length > 0){
      this.setState({ players: searchedPlayer });
    } else return;
  }

  handleDraft = async (player) => {
    const { players, user } = this.state;
    await favoritePlayer(player);
    player.hasBeenDrafted = true;
    player.userName = user;
    //change player item to boolean userName
    const updatedPlayers = players.map(p => {
      return p.playerId === player.playerId ? player : p;
    });
    socketEmitChange(player);
    this.setState({ players: updatedPlayers });
    
  };

  handleLogin = () => {
    socketLogIn(this.state.user);
    socketOtherLogIn((users) => this.setState({ users: users }));
    this.setState({ loggedIn: true });
   

  }

  render() {
    const { user1Drafted, user2Drafted, user3Drafted, users, currentPlayer, time, user, loggedIn } = this.state;
    return (
      <div className="DraftPage">
        <button onClick={this.handleLogin} disabled={loggedIn}>Start Draft</button>
        <h5>Time: {time}</h5>
        {currentPlayer.user === user && 
        <>
          <PlayerSearch onSearch={this.handleSearch}/>
          <PlayerList players={this.state.players} onDraft={this.handleDraft}/>
        </>}
        <DraftedPlayers players={user1Drafted} player={users[0]}/>
        <DraftedPlayers players={user2Drafted} player={users[1]}/>
        <DraftedPlayers players={user3Drafted} player={users[2]}/>
      </div>
    );
  }

}
