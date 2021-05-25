import { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerItem from '../common/PlayerItem';
import request from 'superagent';
import './TeamPage.css';

export default class TeamPage extends Component {
  state = {
    myTeam: [{
      'playerId': 20000440,
      'name': 'Marcin Gortat',
      'position': 'C',
      'fantasyPoints': 0
    },
    {
      'playerId': 20000441,
      'name': 'Bradley Beal',
      'position': 'SG',
      'fantasyPoints': 65
    },
    {
      'playerId': 20000442,
      'name': 'John Wall',
      'position': 'PG',
      'fantasyPoints': 57
    },
    {
      'playerId': 20000443,
      'name': 'Otto Porter Jr.',
      'position': 'SF',
      'fantasyPoints': 42
    },
    {
      'playerId': 20000452,
      'name': 'Garrett Temple',
      'position': 'SG',
      'fantasyPoints': 23
    },
    {
      'playerId': 20000453,
      'name': 'Terrence Ross',
      'position': 'SG',
      'fantasyPoints': 37
    },
    {
      'playerId': 20000455,
      'name': 'Jonas Valanciunas',
      'position': 'C',
      'fantasyPoints': 52
    },
    {
      'playerId': 20000456,
      'name': 'DeMar DeRozan',
      'position': 'SG',
      'fantasyPoints': 61
    },
    {
      'playerId': 20000457,
      'name': 'Kyle Lowry',
      'position': 'PG',
      'fantasyPoints': 57
    },
    {
      'playerId': 20000458,
      'name': 'Amir Johnson',
      'position': 'PF',
      'fantasyPoints': 0
    },
    {
      'playerId': 20000459,
      'name': 'Lou Williams',
      'position': 'SG',
      'fantasyPoints': 44
    },
    {
      'playerId': 20000460,
      'name': 'Patrick Patterson',
      'position': 'PF',
      'fantasyPoints': 9
    },
    {
      'playerId': 20000464,
      'name': 'James Johnson',
      'position': 'PF',
      'fantasyPoints': 31
    }],
    token: window.localStorage.getItem('TOKEN'),
    loading: false
  }

componentDidMount = async () => {
  try {
    const { token } = this.state;

    this.setState({ loading: true });

    const response = request
      .get('/api/me/players')
      .set('Authorization', token);

    this.setState({ myTeam: response.body });
  }
  finally {
    this.setState({ loading: false });
  }
}

handleDragEnd = result => {
  if (!result.destination) return;
  const { myTeam } = this.state;
  const items = Array.from(myTeam);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  this.setState({ myTeam : items });
}
  
render() {
  const { myTeam } = this.state;
   
  return (
    <div className="TeamPage">
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="players">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {myTeam.map((player, index) => {
                  
                return (<Draggable key={player.playerId} draggableId={String(player.playerId)} index={index}>
                  {(provided) => (
                    <PlayerItem 
                      reference={provided.innerRef} 
                      provided={provided}
                      player={player}/>
                  )}

                </Draggable>);
              })}
              {provided.placeholder}
            </ul>
                

          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

}