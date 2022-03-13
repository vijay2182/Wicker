const express = require("express")
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})

app.use(express.json());

server.listen(3001, ()=>{
    console.log("server running on 3001....")
})

io.on('connection', (socket) =>{

    console.log(socket.id);

    socket.on('join_room', (data) =>{
        socket.join(data.room);
        console.log(data.username+" joined room: "+data.room);
    })

    socket.on('send_message', (data) =>{
        console.log(data);
        io.to(data.room).emit("receive_message", data.content);
    })

    socket.on('disconnect', ()=>{
        console.log("USER DISCONNECTED");
    })

})