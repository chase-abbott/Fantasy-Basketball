import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    // superagent considers 400 errors
    .ok(res => res.status < 500) 
    .send(credentials);

  // re-throw any bad request
  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}