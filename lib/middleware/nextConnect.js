import connect from 'next-connect';
import databaseMiddleware from './mongoose';

export default function createHandler () {
  return connect().use(databaseMiddleware)//toda vez que entrar em uma rota ele conecta ao bd
}