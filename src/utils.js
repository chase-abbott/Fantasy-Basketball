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
  // not sure why each of these has extra sub object with "data" property ???
  return {
    team: { data: team },
    startingFive: { data: team.slice(0, 5) },
    bench: { date: team.slice(5, 10) }
  };
}

export function addTotalPoints(startingFive) {
  return startingFive.reduce((a, b) => a + b);
}

export function findNull(teamArray){
  return teamArray.find(element => !element);
}
