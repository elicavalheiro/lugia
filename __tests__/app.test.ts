import db from '../src/database/connection';

interface User {
  name?: string;
  email?: string;
  login?: string;
  password?: string;
  avatar?: string
};

describe('DB', () => {
  it('should list a user', async () => {
    const users = await db('users');

    const user: User = users[0];

    expect(user.name).toEqual('Elimara');
  })
})