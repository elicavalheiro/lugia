import { Request, Response } from 'express';

import db from '../database/connection';

interface User {
  name?: string;
  email?: string;
  login?: string;
  password?: string;
  avatar?: string
};

export default class UsersController {
  async list(request: Request, response: Response){
    const userId: string = request.params.id;

    if(userId){
      const user: object[] = await db('users').where('id', userId);

      return response.json({
        message: "Usuário encontrado com sucesso." ,
        data: user[0]
      });
    }

    const users: object[]= await db.select('name', 'email').from<User>('users');
    const totalUsers: object[] = await db('users').count('* as total');

    const { total }: { total?: number } = totalUsers[0];

    return response.json({
      message: 'A listagem de usuários foi realizada com sucesso.',
      count: total,
      data: users,
    });
  }

  async create(request: Request, response: Response){
    try {
      const {
        name,
        email,
        login,
        password
      }: User = request.body;
  
      await db('users').insert({
        name,
        email,
        login,
        password
      });
  
      return response.json({ message: 'Usuário criado.' });
    } catch (error: any) {
      if(error.errno === 19){
        return response.status(401).json({
          message: 'O login informado já está em uso.',
          error,
        })
      }

      return response.json(error);
    }
  }

  async update(request: Request, response: Response){
    const userId: string = request.params.id;
    const payload: User = request.body;

    await db('users').where('id', userId).update({
      name: payload.name,
      email: payload.email,
      login: payload.login,
      password: payload.password,
      avatar: payload.avatar
    });

    return response.json({ 
      message: 'As informações do usuário foram atualizadas',
      data: payload
    });
  }

  async delete( request: Request, response: Response){
    const userId: string = request.params.id;

    await db('users').where('id', userId).del();

    return response.json({ message: 'A conta foi removida.' });
  }
}