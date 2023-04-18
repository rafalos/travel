import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function IndexPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>index</h1>
      {user && user.email}
    </div>
  );
}

export default IndexPage;
