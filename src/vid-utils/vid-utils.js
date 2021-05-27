import request from 'superagent';

export async function getVids() {
  const response = await request
    .get('/api/vids')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}

//comment