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
  const findPG = team.find(player => (player.postion === 'PG'));
  const findSG = team.find(player => (player.postion === 'SG'));
  const findSF = team.find(player => (player.postion === 'SF'));
  const findPF = team.find(player => (player.postion === 'PF'));
  const findC = team.find(player => (player.postion === 'C'));
  arr.push(findPG, findSG, findSF, findPF, findC);
  const remainingPlayers = team.filter(player => {
    return (player.id !== findPG.id) || (player.id !== findSG.id) || (player.id !== findSF.id) || (player.id !== findPF.id) || (player.id !== findC.id);
  });
  return [arr, remainingPlayers];
}

export function addTotalPoints(startingFive) {
  const sum = startingFive.reduce((accumulator, currentValue) => {
    return accumulator += currentValue.fantasyPoints;
  }, 0);
  return sum;
}