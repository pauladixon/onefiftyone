import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Invalid credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function logout() {
  tokenService.removeToken();
}

function getCurrent() {
  return tokenService.getUserFromToken();
}

function getUser(id) {
  return fetch(BASE_URL + id).then(res => res.json());
}

export default {
  signup, 
  login,
  logout,
  getCurrent,
  getUser
};
