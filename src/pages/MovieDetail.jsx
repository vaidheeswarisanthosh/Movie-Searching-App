// src/pages/MovieDetail.js
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../apiService';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setError(null);
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch {
        setError('An error occurred. Please try again later.');
      }
    };
    getMovieDetails();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 w-1/2">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-4 mt-6" />
      <h1 className="text-2xl font-bold text-gray-500 mt-6">{movie.Title}</h1>
      <p className='text-purple-800 mt-6'>{movie.Year} | {movie.Genre}</p>
      <p className='text-sm mt-6 text-gray-600'>{movie.Plot}</p>
      <p className='text-sm mt-6 text-purple-800'>Cast: {movie.Actors}</p>
      <p className='text-md mt-6 text-pink-600'>Rating: {movie.imdbRating}</p>
    </div>
  );
}

export default MovieDetail;
