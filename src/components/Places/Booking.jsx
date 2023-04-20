import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Booking({ place }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  let numberOfDays = 0;

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookingHandler() {
    const data = {
      place: place._id,
      price: numberOfDays * place.price * numberOfGuests,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
    };
    const response = await axios.post('/bookings', data);

    const { _id } = response.data;
    navigate(`/account/bookings/${_id}`);
  }

  return (
    <>
      <div className='bg-white shadow p-4 rounded-2xl'>
        <div className='text-2xl text-center'>
          Price: ${place.price} / per night
        </div>
        <div className='border rounded-2xl mt-4'>
          <div className='flex'>
            <div className='p-3 px-4'>
              <label>Check in</label>
              <input
                type='date'
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className='p-3 px-4 border-t'>
              <label>Check out</label>
              <input
                type='date'
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className='p-3 px-4 border-t flex flex-col'>
            <label>Number of guests</label>
            <input
              type='number'
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfDays > 0 && (
            <div className='p-3 px-4 border-t flex flex-col'>
              <label>Full name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone number</label>
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
        <button className='primary mt-4' onClick={bookingHandler}>
          Book this place&nbsp;
          {numberOfDays > 0 && (
            <span>{numberOfDays * place.price * numberOfGuests}$</span>
          )}
        </button>
      </div>
    </>
  );
}

export default Booking;
