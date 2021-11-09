import { io } from "socket.io-client";

const initConnection = () => {
    const socket = io('http://localhost:3000');
    return socket;
}
export default initConnection;