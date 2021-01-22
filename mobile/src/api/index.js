import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080', // schimb cu forwarding de la ngrok
});
