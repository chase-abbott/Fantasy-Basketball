import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    .send(credentials);

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .send(credentials);

  return response.body;
}

export function mungeTeam(team){
  const newTeam = {};

  newTeam.team = {
    data: team
  };

  const startingFive = [team[0], team[1], team[2], team[3], team[4]];

  newTeam.startingFive = {
    data: startingFive
  };

  const bench = [team[5], team[6], team[7], team[8], team[9]];

  newTeam.bench = {
    data: bench
  };

  return newTeam;
}

export function addTotalPoints(startingFive) {
  const sum = startingFive.reduce((accumulator, currentValue) => {
    return accumulator += currentValue.fantasyPoints;
  }, 0);
  return sum;
}

export function findNull(teamArray){
  return teamArray.find((element) => element === null);
}
