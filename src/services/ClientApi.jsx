import axios from 'axios';
let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      }
    }

const client = axios.create({
    baseURL: 'http://localhost:8089/client/',
    config
});

export default client;
