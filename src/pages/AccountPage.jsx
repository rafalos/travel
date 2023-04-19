import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, useParams, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import Navigation from '../components/Account/Navigation';

function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const navigate = useNavigate();
  let { pathname } = useLocation();

  const splitPath = pathname.split('/')
  const location = splitPath[splitPath.length -1]

  async function logoutHandler() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (redirect) {
    navigate(redirect);
  }

  if (!ready) {
    return 'Loading....';
  }

  if (ready && !user && !redirect) {
    return navigate('/login');
  }

  return (
    <div>
      <Navigation />
      {location === 'account' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button onClick={logoutHandler} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
      {location !== 'account' && <Outlet />}
    </div>
  );
}

export default AccountPage;
