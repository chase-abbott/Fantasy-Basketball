import { Component } from 'react';
import { getScores } from '../score-utils/score-utils';
import ScoreItem from './ScoreItem';
import './ScoreList.css';

export default class ScoreList extends Component {
    state = {
      scores: []
    }

  componentDidMount = async () => {
    const scores = await getScores();
    this.setState({ scores: scores });
  }
  
  render() {
    const { scores } = this.state;

    return (
      <ul className="ScoreList" style={{ marginTop: '50px' }}>
        {scores.map(score => (
          <ScoreItem key={score.id} score={score}/>
        ))}
      </ul>
    );
  }

}