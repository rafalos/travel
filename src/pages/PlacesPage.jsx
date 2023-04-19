import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
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

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });

    setAddedPhotos((prevState) => {
      return [...prevState, filename];
    });

    setPhotoLink('');
  }

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link
            className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'
            to='/account/places/new'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === 'new' && (
        <div>
          <form>
            {preInput(
              'Title',
              'Title for your place. Should be short and catchy'
            )}
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
            <div className='flex gap-2'>
              <input
                onChange={(e) => setPhotoLink(e.target.value)}
                value={photoLink}
                type='text'
                placeholder='Add using link ....jpg'
              />
              <button
                className='bg-gray-200 px-4 rounded-2xl'
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div>
                    <img
                      className='rounded-2xl'
                      src={'http://localhost:4000/uploads/' + link}
                      alt=''
                    />
                  </div>
                ))}
              <label className='cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                <input type='file' className='hidden' />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z'
                    clipRule='evenodd'
                  />
                </svg>
                Upload
              </label>
            </div>
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
      )}
    </div>
  );
}

export default PlacesPage;
