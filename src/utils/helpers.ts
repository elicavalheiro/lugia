import jwt from 'jsonwebtoken';
require('dotenv').config();

export function generateToken(params: {}){
  return jwt.sign(params, process.env.AUTH_SECRET, {
    expiresIn: 8640
  })
}