// src/apiService.js
import axios from 'axios';

const API_KEY = '2eaff3ef';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page,
        type,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movies.');
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details.');
  }
};
