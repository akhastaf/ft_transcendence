import React, { useState } from "react";
import { io } from "socket.io-client";

let token = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('accessToken');
}

const URL = `${process.env.ServerHostName}`;

export const socket = io(URL, {
  withCredentials: true,
  forceNew: true,
  timeout: 100000, //before connect_error and connect_timeout are emitted.
  transports: ['websocket'],
  auth: {
    token: token,
  },
});

export const SocketContext = React.createContext(socket);

// socket.emit("connection");
