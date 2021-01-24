import axios from 'axios';

export default axios.create({
  baseURL: 'http://e2a7c7636b63.ngrok.io', // schimb cu forwarding de la ngrok
});
