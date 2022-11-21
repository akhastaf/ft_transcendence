import { io } from "socket.io-client";

let token = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('accessToken');

}

// let backendHost = process.env.NEXT_PUBLIC_API_BASE_URL;


// let socket = io('http://localhost:8080', { transports: ['websocket'], auth: {
//   token: token
// }});
const URL = "http://localhost:3000/";

let socket = io(URL, {
  withCredentials: true,
  forceNew: true,
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ['websocket'],
  auth: {
    token: token,
  },
});

export {socket};