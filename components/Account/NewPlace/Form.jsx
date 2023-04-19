import React, { useEffect, useState } from 'react';
import Perks from '../../../src/Perks';
import axios from 'axios';
import PhotosUploader from '../../../src/PhotosUploader';
import { useNavigate, useParams } from 'react-router-dom';
import AccountNav from '../Navigation';

function PlacesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [price, setPrice] = useState(1000);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchPlace = async () => {
      const response = await axios.get(`/places/${id}`);
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
    };

    fetchPlace();
  }, [id]);

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

  async function saveHandler(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      price,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    if (id) {
      const data = {
        id,
        ...placeData,
      };
      await axios.put('/places', data);
      navigate('/account/places');
    } else {
      await axios.post('/places', placeData);
      navigate('/account/places');
    }
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveHandler}>
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
        <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
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
          <div>
            <h3 className='mt-2 -mb-1'>Price per night</h3>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
