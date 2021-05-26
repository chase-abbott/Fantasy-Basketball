import request from 'superagent';

export async function getNews() {
  const response = await request
    .get('/api/news')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  const news = response.body;
  const results = JSON.stringify(news);
  const results2 = results.replaceAll('{"news":"', '');
  const results3 = results2.replaceAll('"}', '');
  const results4 = results3.replaceAll('[', '');
  const results5 = results4.replaceAll(']', '');
  return results5;
}