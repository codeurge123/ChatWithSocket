import {io} from "socket.io-client"


export const connectWS = () => {
    return io('https://chat-with-socket-thu8.vercel.app')
}