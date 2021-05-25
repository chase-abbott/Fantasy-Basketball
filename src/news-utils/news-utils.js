import request from 'superagent';

export async function getNews() {
  const response = await request
    .get('/api/news')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body.news;
}