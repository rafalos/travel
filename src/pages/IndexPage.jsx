import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await axios.get('/places');

      setPlaces([
        ...response.data,
        ...response.data,
        ...response.data,
        ...response.data,
      ]);
    };

    fetchPlaces();
  }, []);

  return (
    <div className='mt-8 grid gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
              {place.photos?.[0] && (
                <img
                  className='rounded-2xl object-cover aspect-square'
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                ></img>
              )}
            </div>

            <h2 className='font-bold'>{place.address}</h2>
            <h3 className='text-sm truncate text-grey-500'>{place.title}</h3>
            <div className='mt-1'>
              <span className='font-bold'>${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
