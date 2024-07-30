import axios from 'axios';

const fetchCities = async (upperZipCode: string, lowerZipCode: string) => {
    const response = await axios.get(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/search-city`, {
      params: {
        upperZipCode,
        lowerZipCode
      }
    });
    return response.data;
  };
  
const fetchDistricts = async (city: string) => {
  const response = await axios.get(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/districts`, {
    params: { city }
  });
  return response.data;
};

const fetchWards = async (district: string) => {
  const response = await axios.get(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/wards`, {
    params: { district }
  });
  return response.data;
};

export { fetchCities, fetchDistricts, fetchWards };