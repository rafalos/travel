import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginHandler(e) {
    e.preventDefault();

    try {
      const {data} = await axios.post('/login', {
        email,
        password,
      });
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (error) {
      alert('Login failed');
    }
  }

  if (redirect) {
    navigate('/');
  }

  return (
    <div className='mt-4 grow flex items-center justify-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-lg mx-auto' onSubmit={loginHandler}>
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-grey-500'>
            Dont have an account yet?{' '}
            <Link className='underline text-black' to='/register'>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
