import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import Navigation from '../../components/Account/Navigation';

function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const navigate = useNavigate();
  let { subpage } = useParams();

  async function logoutHandler() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (subpage === undefined) {
    subpage = 'profile';
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
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button onClick={logoutHandler} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}

export default AccountPage;
