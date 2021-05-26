import request from 'superagent';

export async function getScores() {
  const response = await request
    .get('/api/scores')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  console.log(response.body);
  return response.body;
}