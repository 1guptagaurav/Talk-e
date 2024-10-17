import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity,
  reconnectionDelayMax: 1000,
  transports: ["websocket"],
});