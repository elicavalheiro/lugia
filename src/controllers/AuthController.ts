import { Request, Response } from 'express';

import db from '../database/connection';

import { generateToken } from '../utils/helpers';

interface User {
  id?: Number;
  name?: string;
  email?: string;
  login?: string;
  password?: string;
  avatar?: string
};

export default class AuthController {
  async login(request: Request, response: Response){
    const { email, password }: User = request.body;

    const user: object[] = await db('users').where('email', email);

    if(user.length === 0) return response.status(400).json({
      message: 'Usuário não encontrado'
    })

    if((<User>user[0]).password !== password) return response.status(400).json({
      message: 'Senha inválida'
    })

    const token = generateToken({ id: <User>user[0].id });

    response.json({ 
      message: 'Autenticado corretamente.',
      user,
      token
    });
  }
}