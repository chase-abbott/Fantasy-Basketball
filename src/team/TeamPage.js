import { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerItem from '../common/PlayerItem';
// import request from 'superagent';
import './TeamPage.css';

export default class TeamPage extends Component {
  state = {
    bench: [
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
      }],
    startingFive: [{
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
      'playerId': 20000458,
      'name': 'Amir Johnson',
      'position': 'PF',
      'fantasyPoints': 0
    }],
    token: window.localStorage.getItem('TOKEN'),
    loading: false
  }

  // componentDidMount = async () => {
  //   try {
  //     const { token } = this.state;

  //     this.setState({ loading: true });

  //     const response = request
  //       .get('/api/me/players')
  //       .set('Authorization', token);

  //     this.setState({ myTeam: response.body });
  //   }
  //   finally {
  //     this.setState({ loading: false });
  //   }
  // }

  handleDragEnd = result => {
    console.log(result);
    if (!result.destination) return;
    const { bench, startingFive } = this.state;

    // determines if tile is put in the other list
    if (result.destination.droppableId !== result.source.droppableId) {

    }

    if (result.destination.droppableId === 'startingFive') {
      // reorders players in startingFive array
      const newItems = Array.from(startingFive);
      const [reorderedNewItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedNewItem);
      this.setState({ startingFive: newItems });
    }

    if (result.destination.droppableId === 'bench') {
      // reorders players in myTeam array
      const items = Array.from(bench);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      this.setState({ bench: items });
    }
  }

  render() {
    const { bench, startingFive } = this.state;

    return (
      <div >
        {bench || startingFive
          ? <div>
            <h2> Starting Five </h2>
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable droppableId="startingFive" direction="horizontal">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="TeamPage">
                    {startingFive.map((player, index) => {

                      return (<Draggable key={player.playerId} draggableId={String(player.playerId)} index={index}>
                        {(provided) => (
                          <PlayerItem
                            reference={provided.innerRef}
                            provided={provided}
                            player={player} />
                        )}

                      </Draggable>);
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <Droppable droppableId="bench" direction="horizontal">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="TeamPage">
                    {bench.map((player, index) => {

                      return (<Draggable key={player.playerId} draggableId={String(player.playerId)} index={index}>
                        {(provided) => (
                          <PlayerItem
                            reference={provided.innerRef}
                            provided={provided}
                            player={player} />
                        )}

                      </Draggable>);
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          : <h2> Draft a team! </h2>}
      </div>
    );
  }

}