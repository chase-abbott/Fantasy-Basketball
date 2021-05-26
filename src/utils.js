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

export function mungeTeams(team) {
  const arr = [];
  const filterPG = team.filter(player => (player.postion === 'PG'));
  const filterSG = team.filter(player => (player.postion === 'SG'));
  const filterSF = team.filter(player => (player.postion === 'SF'));
  const filterPF = team.filter(player => (player.postion === 'PF'));
  const filterC = team.filter(player => (player.postion === 'C'));
  arr.push(filterPG[0], filterSG[0], filterSF[0], filterPF[0], filterC[0]);
  const remainingPlayers = team.filter(player => {
    return (player.id !== filterPG[0].id) || (player.id !== filterSG[0].id) || (player.id !== filterSF[0].id) || (player.id !== filterPF[0].id) || (player.id !== filterC[0].id);
  });
  return [arr, remainingPlayers];
}

export function addTotalPoints(startingFive) {
  const sum = startingFive.reduce((accumulator, currentValue) => {
    return accumulator += currentValue.fantasyPoints;
  }, 0);
  return sum;
}