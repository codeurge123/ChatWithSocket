import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server,{
    cors: {
        origin: 'https://chat-with-socket.vercel.app',
    }
});

const ROOM = 'group';

io.on('connection',(socket) => {
    console.log("user connected", socket.id)

    socket.on('joinRoom',async (userName) => {
        console.log(`${userName} is joining the room`);
        // ab humko client/user ko room mein join karna hai

        await socket.join(ROOM)

        // send to all except the user joined
        socket.broadcast.emit('roomNotice',userName);

        // send to all
        // io.to(ROOM).emit("roomNotice",userName);

    })

    socket.on('chatMessage', (msg) => {
        socket.broadcast.emit('chatMessage',msg);
    })

    socket.on('typing',(userName) => {
        socket.broadcast.emit('typing',userName);
    })
    socket.on('stopTyping',(userName) => {
        socket.broadcast.emit('stopTyping',userName);
    })

})

app.get('/',(req,res) => {
    res.send("hello")
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

