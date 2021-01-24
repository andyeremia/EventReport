import axios from 'axios';

export default axios.create({
  baseURL: 'http://0b1942521afd.ngrok.io', // schimb cu forwarding de la ngrok
});
