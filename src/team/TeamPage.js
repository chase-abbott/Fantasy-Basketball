import { Component } from 'react';
import request from 'superagent';
import './TeamPage.css';

export default class TeamPage extends Component {
  state = {
    myTeam: [],
    token: window.localStorage.getItem('TOKEN')
  }

componentDidMount = async () => {
  try {
    const { token } = this.state;
    const response = request
      .get('/api/me/players')
      .set('Authorization', token);
    this.setState({ myTeam: [...response.body] });
  }
  finally {
   
  }
}
  
render() {
  return (
    <div className="TeamPage">
        
    </div>
  );
}

}