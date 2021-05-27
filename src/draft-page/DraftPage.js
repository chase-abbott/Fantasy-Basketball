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
  // player.userId = window.localStorage.getItem('USER_ID');
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
    loggedIn: false,
    searchedPlayers: null,
    numberOfDrafted: 0
  }
 //userName and id as props
  async componentDidMount() {
    const { draftedPlayers } = this.state;
    const token = window.localStorage.getItem('TOKEN');

    const myPlayers = await request
      .get('/api/me/players')
      .set('Authorization', token);

    console.log(myPlayers.body);

    // if (myPlayers.body[0] !== undefined) {
    //   await request
    //     .delete(`/api/me/players/${window.localStorage.getItem('USER_ID')}`)
    //     .set('Authorization', window.localStorage.getItem('TOKEN'));

    //   await request
    //     .delete(`/api/me/teams/${window.localStorage.getItem('USER_ID')}`)
    //     .set.set('Authorization', window.localStorage.getItem('TOKEN'));

    // }

    socketOnStart((user, interval, time) => {
      this.setState({ currentPlayer: user, time: time });
    
    });
    socketCurrentPlayer((user) => {this.setState({ currentPlayer: user });});
    socketOtherLogIn((users) => this.setState({ users: users }));
    
 
    socketOnChange((players, draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted) => this.setState({ players, draftedPlayers: draftedPlayers, user1Drafted: userOneDrafted, user2Drafted: userTwoDrafted, user3Drafted: userThreeDrafted }));
  
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
  
//
  }
  handleSearch = (search) => {
    const { players } = this.state;
    
    const aRegex = new RegExp(search, 'i');
    const searchedPlayers = players.filter(player => {
      return player.name.match(aRegex);
    }).sort((a, b) => {
      return b.fantasyPoints - a.fantasyPoints;
    });
   
    this.setState({ searchedPlayers: searchedPlayers });

    

  }

  handleDraft = async (player) => {
    const { players, user, numberOfDrafted } = this.state;
    await favoritePlayer(player);
    player.hasBeenDrafted = true;
    player.userName = user;
    //change player item to boolean userName
    const updatedPlayers = players.map(p => {
      return p.playerId === player.playerId ? player : p;
    });
    socketEmitChange(player, updatedPlayers);
    
    this.setState({ searchedPlayers: updatedPlayers, numberOfDrafted: numberOfDrafted + 1 });
    
 
    
  };

  handleLogin = () => {
    socketLogIn(this.state.user);
    socketOtherLogIn((users) => this.setState({ users: users }));
    this.setState({ loggedIn: true });
   

  }
  render() {
    const { user1Drafted, user2Drafted, user3Drafted, users, currentPlayer, time, user, loggedIn, searchedPlayers, players, numberOfDrafted } = this.state;
    return (
      <div className="DraftPage">
        <button onClick={this.handleLogin} disabled={loggedIn}>Start Draft</button>
        <h5>Time: {time}</h5>
        {(currentPlayer.user === user && numberOfDrafted < 9) &&
        <>
          <PlayerSearch onSearch={this.handleSearch}/>
          <PlayerList players={searchedPlayers ? searchedPlayers : players} onDraft={this.handleDraft}/>
        </>}
        <DraftedPlayers players={user1Drafted} player={users[0]}/>
        <DraftedPlayers players={user2Drafted} player={users[1]}/>
        <DraftedPlayers players={user3Drafted} player={users[2]}/>
    
        
      </div>
    );
  }

}