import { Component } from 'react';
import ScoreList from '../scores/ScoreList';
import VideoList from '../video-folder/VideoList';
import Ticker from '../ticker/Ticker';
import TeamTable from '../team-table/TeamTable';
import request from 'superagent';
import './Home.css';

export default class Home extends Component {
  state = {
    startingFive: ''
  }

  handleClick = () => {
    let click = window.confirm('Heading to the draft will delete your current team. Continue?');
    if (click === true) {
      window.location = '/draft';
    }
  }

  componentDidMount = async () => {
    const userTeam = await request
      .get('/api/me/team')
      .set('Authorization', window.localStorage.getItem('TOKEN'));

    if (userTeam.body[0]){
      this.setState({ startingFive: userTeam.body.startingFive });
    }
  }
  
  render() {
    const { startingFive } = this.state;
    const { scores } = this.props;
    return (
      <div className="Home">
        <Ticker/>
        <div className='home-info'>
          <span className='draftLink' onClick={this.handleClick}>DRAFT TIME</span>
          <ScoreList className='scoreList' scores={scores}/>
        </div>
        <div className="videos">
          <VideoList/> 
        </div>
        
        <div className='team-table'>
          {startingFive
            ? <TeamTable/>
            : <div className="placeholder-div"></div>
          }
        </div>
      </div>

    );
  }
}