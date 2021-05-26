import { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerItem from '../common/PlayerItem';
import request from 'superagent';
import './TeamPage.css';
import { addTotalPoints, mungeTeam } from '../utils.js';

export default class TeamPage extends Component {
  state = {
    bench: [],
    startingFive: [],
    token: window.localStorage.getItem('TOKEN'),
    loading: false,
    projectedPoints: 0,
    teamId: 0,
    team: []
  }

  componentDidMount = async () => {
    try {
      const { token, startingFive } = this.state;
      const points = addTotalPoints(startingFive);
      this.setState({ loading: true, projectedPoints: points });

      const response = request
        .get('/api/me/players')
        .set('Authorization', token);

      if (response.body) {
        
        const mungedTeam = mungeTeam(response.body);

        const newTeam = await request
          .post('/api/me/team')
          .set('Authorization', token)
          .send(mungedTeam);

        const updatedPoints = addTotalPoints(startingFive);
        this.setState({ bench: newTeam.body.bench, startingFive: newTeam.body.startingFive, projectedPoints: updatedPoints, teamId: newTeam.body.id, team: newTeam.body.team });
      }
    }
    finally {
      this.setState({ loading: false });
    }
  }

  handleDragEnd = async (result) => {

    // if the result destination is undefined, stop function
    if (!result.destination) return;

    const { bench, startingFive, teamId, team, token } = this.state;
    const isNewList = (result.destination.droppableId !== result.source.droppableId);

    // determines if tile is put in the other list
    if (isNewList) {

      // saves id 
      const sourceString = result.source.droppableId;
      const destinationString = result.destination.droppableId;

      // finds matching array in state
      const sourceArray = this.state[sourceString];
      const destinationArray = this.state[destinationString];

      // grabs individual items and pulls them out of their current array
      const [reorderedSourceItem] = sourceArray.splice(result.source.index, 1);
      const [reorderDestinationItem] = destinationArray.splice(result.destination.index, 1);

      // places new item into array
      destinationArray.splice(result.destination.index, 0, reorderedSourceItem);
      sourceArray.splice(result.source.index, 0, reorderDestinationItem);

      const updatedTeam = {
        id: teamId,
        team: team,
        [sourceString]: sourceArray,
        [destinationString]: destinationArray
      };

      await request
        .put(`/api/me/team/${teamId}`)
        .set('Authorization', token)
        .send(updatedTeam);

      this.setState({ [sourceString]: sourceArray, [destinationString]: destinationArray });

    }

    if (result.destination.droppableId === 'startingFive' && !isNewList) {
      // reorders players in startingFive array
      const newItems = Array.from(startingFive);

      const [reorderedNewItem] = newItems.splice(result.source.index, 1);

      newItems.splice(result.destination.index, 0, reorderedNewItem);
      this.setState({ startingFive: newItems });
    }

    if (result.destination.droppableId === 'bench' && !isNewList) {
      // reorders players in myTeam array
      const items = Array.from(bench);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      this.setState({ bench: items });
    }
    this.setState({ projectedPoints: addTotalPoints(startingFive) });
  }


  render() {
    const { bench, startingFive, projectedPoints } = this.state;

    return (
      <div >
        {bench || startingFive
          ? <div className="container">
            <h2> Starting Five </h2>
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId="startingFive"
                direction="horizontal"
              >
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="TeamPage"
                  >
                    {startingFive.map((player, index) => {

                      return (<Draggable
                        key={player.playerId}
                        draggableId={String(player.playerId)}
                        index={index}
                      >
                        {(provided) => (
                          <PlayerItem
                            reference={provided.innerRef}
                            provided={provided}
                            player={player}
                          />
                        )}

                      </Draggable>);
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <p className="points"> Project total points = {projectedPoints}</p>
              <h2> Bench </h2>
              <Droppable droppableId="bench" direction="horizontal">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="TeamPage">
                    {bench.map((player, index) => {

                      return (<Draggable key={player.playerId} draggableId={String(player.playerId)} index={index}>
                        {(provided) => (
                          <PlayerItem
                            reference={provided.innerRef}
                            provided={provided}
                            player={player}
                          />
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