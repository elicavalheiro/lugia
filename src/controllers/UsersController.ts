import { query, Request, Response } from 'express';

import db from '../database/connection';

export default class UsersController {
  async list(request: Request, response: Response){
    const users = await db('users');

    return response.json(users);
  }

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

    return response.json({ message: 'Usuário criado.' });
  }

  async update(request: Request, response: Response){
    const userId = request.params.id;
    const payload = request.body;

    await db('users').where('id', userId).update({
      name: payload.name,
      email: payload.email,
      login: payload.login,
      password: payload.password,
      avatar: payload.avatar
    });

    return response.json({ 
      message: 'Informações atualizadas',
      data: payload
    });
  }
}