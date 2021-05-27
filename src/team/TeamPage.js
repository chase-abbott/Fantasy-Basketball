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
    team: [],
    teamId: ''
  }

  setTeam = async (team) => {
    this.setState({ bench: team.bench, startingFive: team.startingFive, team: team.team, teamId: team.id });
  }

 updateTeam = async (state) => {
   const { teamId, token } = this.state;
   
   const updatedTeam = {
     team: state.team,
     startingFive: state.startingFive,
     bench: state.bench,
     id: state.teamId
   };
   console.log(updatedTeam);

   const response = await request
     .put(`/api/me/team/${teamId}`)
     .set('Authorization', token)
     .send(updatedTeam);

   console.log(response);

   return response.body;
 }

  componentDidMount = async () => {
    this.mounted = true;
    try {
      const { token } = this.state;
      // const points = addTotalPoints(startingFive);
      // this.setState({ loading: true, projectedPoints: points });

      const playerResponse = await request
        .get('/api/me/players')
        .set('Authorization', token);

      const teamResponse = await request
        .get('/api/me/team')
        .set('Authorization', token);

      
      if (playerResponse.body && !teamResponse.body[0]) {
        
        const mungedTeam = mungeTeam(playerResponse.body);
        mungedTeam.userId = window.localStorage.getItem('USER_ID');

        const newTeam = await request
          .post('/api/me/team')
          .set('Authorization', token)
          .send(mungedTeam);

        const points = addTotalPoints(newTeam.startingFive);

        if (this.mounted){
          this.setState({ bench: newTeam.body.bench, startingFive: newTeam.body.startingFive, team: newTeam.body.team, projectedPoints: points, teamId: newTeam.body.id });
        }

      } else {
        await this.setTeam(teamResponse.body[0]);
        
        if (this.mounted) {
          this.setState({ projectedPoints: addTotalPoints(teamResponse.body[0].startingFive) });

        }
        
      }
    }
    catch (err){
      console.log(err);
    }
    finally {
      this.setState({ loading: false });
      
    }
  }

  handleDragEnd = async (result) => {
    console.log(result);

    // if the result destination is undefined, stop function
    if (!result.destination) return;

    const { bench, startingFive } = this.state;
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

      this.setState({ [sourceString]: sourceArray, [destinationString]: destinationArray });


      await this.updateTeam(this.state);

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

  componentWillUnmount = () => {
    this.mounted = false;
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
              <p> Project total points = {projectedPoints}</p>
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