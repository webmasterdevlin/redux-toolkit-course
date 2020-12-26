import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:5000/`,
});

export enum EndPoints {
  heroes = 'heroes',
  antiHeroes = 'anti-heroes',
  villains = 'villains',
  login = 'login',
  register = 'register',
}
