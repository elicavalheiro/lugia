import { Request, Response } from 'express';

import db from '../database/connection';

export default class UsersController {
  async create(request: Request, response: Response){
    const {
      name,
      email,
      login,
      password
    } = request.body;

    await db('users').insert({
      name,
      email,
      login,
      password
    });

    return response.send({ message: 'Usuário criado.' });
  }
}