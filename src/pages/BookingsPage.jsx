import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const response = await axios.get('/bookings');
      setBookings(response.data);
    };

    getBookings();
  },[]);
  return (
    <div>
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <div>
            {booking.checkIn} {booking.checkOut}
          </div>
        ))}
    </div>
  );
}

export default BookingsPage;
