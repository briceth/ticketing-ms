import request from 'supertest';
import { app } from '../../app';

it('Responds with details about the current user', async () => {
  const cookie = await signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Responds with null if not authenticated', async () => {
  const response = await request(app).get('/api/users/currentuser').expect(200);

  expect(response.body.currentUser).toEqual(null);
});
