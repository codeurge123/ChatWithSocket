import {io} from "socket.io-client"


export const connectWS = () => {
    return io('https://chatwithsocket.onrender.com')
}