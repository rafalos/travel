import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Booking() {
  const { id } = useParams();

  return <div>Booking</div>;
}

export default Booking;
