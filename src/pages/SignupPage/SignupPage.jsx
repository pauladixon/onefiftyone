import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

function SignupPage(props) {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    updateMessage('');
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(signupData);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch(err) {
      updateMessage(err.message);
    }
  }

  const isFormInvalid = () => {
    return !(signupData.name && signupData.email && signupData.password === signupData.passwordConf);
  }

  const updateMessage = (msg) => {
    setMessage(msg);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={signupData.name} name="name" onChange={handleChange} />
        <input type="email" placeholder="Email" value={signupData.email} name="email" onChange={handleChange} />
        <input type="password" placeholder="Password" value={signupData.password} name="password" onChange={handleChange} />
        <input type="password" placeholder="Confirm Password" value={signupData.passwordConf} name="passwordConf" onChange={handleChange} />
        <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
      </form>
      <p>{message}</p>
      <Link to='/'>Cancel</Link>
    </div>
  );
}

export default SignupPage;