import { Component } from 'react';
import './DraftPage.css';
import request from 'superagent';
import PlayerList from '../player-list/PlayerList';
import PlayerSearch from '../search/PlayerSearch';
import DraftedPlayers from '../common/DraftedPlayers';
import { socketEmitChange, socketEmitLogin, socketOnChange, socketOnLogin, socketOnStart, socketOnCurrentPlayer } from '../socket-utils/socket-utils.js';
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
    userOneDrafted: [],
    userTwoDrafted: [],
    userThreeDrafted: [],
    user: {},
    users: [],
    currentUser: '',
    time: 0,
    loggedIn: false,
    searchedPlayers: null,
    numberOfDrafted: 0
  }
 //userName and id as props
  async componentDidMount() {
    
    const userId = window.localStorage.getItem('USER_ID');
    const userName = window.localStorage.getItem('USER_NAME');
    this.setState({ user: { userId: userId, userName: userName } });

   
    socketOnStart((user, draftTime, time) => {
      this.setState({ currentUser: user, time: time });
    
    });
    socketOnCurrentPlayer((user) => {this.setState({ currentUser: user });});
    socketOnLogin((users) => this.setState({ users: users }));
    
 
    socketOnChange((players, draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted) => this.setState({ players, draftedPlayers, userOneDrafted, userTwoDrafted, userThreeDrafted }));
    const { draftedPlayers } = this.state;
    
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
    player.userId = user.userId;
    //change player item to boolean userName
    const updatedPlayers = players.map(p => {
      return p.playerId === player.playerId ? player : p;
    });
    socketEmitChange(player, updatedPlayers);
    
    this.setState({ searchedPlayers: updatedPlayers, numberOfDrafted: numberOfDrafted + 1 });
    
 
    
  };

  handleLogin = () => {
    socketEmitLogin(this.state.user);
    //get rid of?
    socketOnLogin((users) => this.setState({ users: users }));
    this.setState({ loggedIn: true });
   

  }
  render() {
    const { userOneDrafted, userTwoDrafted, userThreeDrafted, users, currentUser, time, user, loggedIn, searchedPlayers, players, numberOfDrafted } = this.state;
    return (
      <div className="DraftPage">
        <button onClick={this.handleLogin} disabled={loggedIn}>Start Draft</button>
        <h5>Time: {time}</h5>
        {(currentUser.userId === user.userId && numberOfDrafted < 9) &&
        <>
          <PlayerSearch onSearch={this.handleSearch}/>
          <PlayerList players={searchedPlayers ? searchedPlayers : players} onDraft={this.handleDraft}/>
        </>}
        <DraftedPlayers players={userOneDrafted} user={users[0]}/>
        <DraftedPlayers players={userTwoDrafted} user={users[1]}/>
        <DraftedPlayers players={userThreeDrafted} user={users[2]}/>
    
        
      </div>
    );
  }

}