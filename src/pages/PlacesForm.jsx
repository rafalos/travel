import React, { useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';
import PhotosUploader from '../PhotosUploader';
import { useNavigate } from 'react-router-dom';

function PlacesForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className='text-2xl mt-4'>{text}</h2>;
  }

  function inputDescription(text) {
    return <p className='text-grey-500 text-sm'>{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlaceHandler(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post('/places', placeData);
    navigate('/account/places');
  }

  return (
    <div>
      <form onSubmit={addNewPlaceHandler}>
        {preInput('Title', 'Title for your place. Should be short and catchy')}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Title, for example: My lovely appartment'
        />
        {preInput('Address', 'Address to this place')}

        <input
          value={address}
          type='text'
          placeholder='Address'
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput(
          'Photos',
          'Photos of your lovely place (The more, the better)'
        )}
        <PhotosUploader
          addedPhotos={addedPhotos}
          onPhotosAdded={setAddedPhotos}
        />
        {preInput('Description', 'Describe your place as best as you can')}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput('Perks', 'Select the perks of your place')}
        <Perks selected={perks} onPerkSelected={setPerks} />
        {preInput('Extra info', 'House rules, etc')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput('Check in & out times', 'Add checkin, checkout times.')}
        <div className='grid gap-2 sm:grid-cols-3'>
          <div>
            <h3 className='mt-2 -mb-1'>Check in time</h3>
            <input
              type='text'
              placeholder='14'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Check out time</h3>
            <input
              type='text'
              placeholder='11'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className='mt-2 -mb-1'>Max number of guests</h3>
            <input
              type='number'
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className='primary my-4'>Save</button>
        </div>
      </form>
    </div>
  );
}

export default PlacesForm;
