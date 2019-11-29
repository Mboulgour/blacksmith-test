import hash from './hash';

let token = hash.access_token;

const fetchConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`
  }
};

export default fetchConfig;