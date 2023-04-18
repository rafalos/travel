import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AccountPage() {
  const { ready, user } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();

  async function logoutHandler() {
    await axios.post('/logout');
  }

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return 'Loading....';
  }

  if (ready && !user) {
    return navigate('/login');
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6';

    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }

    return classes;
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link className={linkClasses('profile')} to='/account'>
          My bookings
        </Link>
        <Link className={linkClasses('bookings')} to='/account/bookings'>
          My bookings
        </Link>
        <Link className={linkClasses('places')} to='/account/places'>
          My places
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button onClick={logoutHandler} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
