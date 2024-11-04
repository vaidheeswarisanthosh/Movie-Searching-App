// src/pages/SearchPage.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../apiService';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async () => {
    setError(null);
    try {
      const data = await fetchMovies(query, page, type);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch {
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    if (query) handleSearch();
  }, [query, page, type]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="container -mx-auto p-4">
        <h3 className='text-3xl text-center text-purple-700'>Movie Searching App</h3>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-6 py-2 mt-10 w-1/2 mb-4 ml-10"
      />
    
      <select onChange={handleTypeChange} value={type} className="border p-2 mb-4 ml-10 bg-white text-pink-600">
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mt-10 space-x-4">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-56 object-cover" />
              <h3 className="text-md mt-2 text-purple-500">{movie.Title}</h3>
              <p className='text-gray-600'>{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="border px-4 py-2 bg-blue-400 text-white"
        >
          Previous
        </button>
        <span className="px-4">{page}</span>
        <button
          disabled={movies.length === 0 || page >= Math.ceil(totalResults / 10)}
          onClick={() => setPage((prev) => prev + 1)}
          className="border px-4 py-2 bg-blue-400 text-white "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
