import { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerItem from '../common/PlayerItem';
import request from 'superagent';
import './TeamPage.css';
import { addTotalPoints, mungeTeam, findNull } from '../utils.js';

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

setTeam = (team) => {
  this.setState({ bench: team.bench, startingFive: team.startingFive, team: team.team, teamId: team.id });
}

 updateTeam = async (state) => {
   const { teamId } = this.state;
   
   const updatedTeam = {
     team: state.team,
     startingFive: state.startingFive,
     bench: state.bench,
     id: state.teamId
   };
   console.log(updatedTeam);

   const response = await request
     .put(`/api/me/team/${teamId}`)
     .set('Authorization', window.localStorage.getItem('TOKEN'))
     .send(updatedTeam);

   console.log(response);

   return response.body;
 }



 grabAndMakeTeams = async () => {
   const playerResponse = await request
     .get('/api/me/players')
     .set('Authorization', window.localStorage.getItem('TOKEN'));

   const teamResponse = await request
     .get('/api/me/team')
     .set('Authorization', window.localStorage.getItem('TOKEN'));


   console.log('player response', playerResponse.body);
   console.log('team response', teamResponse.body);

   if (!teamResponse.body[0]) {
     console.log('there is no team');
    
     const mungedTeam = mungeTeam(playerResponse.body);
     mungedTeam.userId = window.localStorage.getItem('USER_ID');

     const newTeam = await request
       .post('/api/me/team')
       .set('Authorization', window.localStorage.getItem('TOKEN'))
       .send(mungedTeam);

       
     const points = addTotalPoints(newTeam.body.startingFive);
    
     this.setState({ 
       bench: newTeam.body.bench, 
       startingFive: newTeam.body.startingFive, 
       team: newTeam.body.team, 
       projectedPoints: points, 
       teamId: newTeam.body.id 
     });
     

   } else {
     this.setTeam(teamResponse.body[0]);
    
     this.setState({ projectedPoints: addTotalPoints(teamResponse.body[0].startingFive) });
     console.log('there is a team');
   }
 }

componentDidMount = async () => {
  try {
    await this.grabAndMakeTeams();
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


  render() {
    const { bench, startingFive, projectedPoints, team } = this.state;
   
    return (
      <div >
        {(!findNull(bench) || !findNull(startingFive) || !findNull(team))
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
                    className="TeamPage starters"
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
                            className="starter"
                          />
                        )}

                      </Draggable>);
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <p> Lineup Points Per Game = {projectedPoints}</p>
              <h2> Bench </h2>
              <Droppable droppableId="bench" direction="horizontal">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="TeamPage bench">
                    {bench.map((player, index) => {

                      return (<Draggable key={player.playerId} draggableId={String(player.playerId)} index={index}>
                        {(provided) => (
                          <PlayerItem
                            reference={provided.innerRef}
                            provided={provided}
                            player={player}
                            className="bench"
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
          : <h2> Draft a team! You need 10 players to field a team! </h2>}
      </div>
    );
  }

}