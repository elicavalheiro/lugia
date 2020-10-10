import { query, Request, Response } from 'express';

import db from '../database/connection';

export default class UsersController {
  async list(request: Request, response: Response){
    const userId = request.params.id;

    if(userId){
      const user = await db('users').where('id', userId);

      return response.json({ data: user[0] });
    }

    const users = await db('users');
    const totalUsers = await db('users').count('* as total');

    const { total } = totalUsers[0];

    return response.json({
      count: total,
      data: users,
    });
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

  async delete( request: Request, response: Response){
    const userId = request.params.id;

    await db('users').where('id', userId).del();

    return response.json({ message: 'Conta removida.' });
  }
}