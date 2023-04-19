import React, { useState } from 'react';
import axios from 'axios';

function PhotosUploader({ addedPhotos, onPhotosAdded }) {
  const [photoLink, setPhotoLink] = useState('');

  async function uploadPhotoHandler(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    const response = await axios.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    onPhotosAdded((prevState) => [...prevState, ...response.data]);
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });

    onPhotosAdded((prevState) => {
      return [...prevState, filename];
    });

    setPhotoLink('');
  }

  return (
    <>
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
            <div className='h-32 flex' key={link}>
              <img
                className='rounded-2xl w-full object-cover'
                src={'http://localhost:4000/uploads/' + link}
                alt=''
              />
            </div>
          ))}
        <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
          <input
            multiple
            type='file'
            className='hidden'
            onChange={uploadPhotoHandler}
          />
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
    </>
  );
}

export default PhotosUploader;
