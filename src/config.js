const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://inc34needmoney-production.up.railway.app'
    : 'http://localhost:3001';

export default API_BASE_URL;
