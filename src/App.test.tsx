import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import instance from './api/index';
// let api = require('./api/index.ts')

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const LoginAPI = {
  login:(config:any)=>
   instance.get('users/login',{params:config}),
  signup:(config:any)=>
  instance.post('/users',{data:config})
}


test('login API',()=>{
  const res = LoginAPI.signup({stockusersystemName:"JGQ@qq.com",stockusersystemPassword:"1231321",});
  console.log(res);
})
