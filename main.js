var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const {joinUser, removeUser} = require('./users');

//Serve the UI
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

let thisRoom = "";

//Handles the connection to the socket
//Connect to socket
io.on("connection", function(socket) {
    console.log("Connected");
    //Listening to "join room"
    socket.on("join room", (data) => {
        console.log("in room");
        let Newuser = joinUser(socket.id, data.username, data.roomName);
        //Connect to "send data" and send data
        socket.emit("send data", {id: socket.id, username: Newuser.username, roomname: Newuser.roomname});
        thisRoom = Newuser.roomname;
        console.log(Newuser);
        //Join the room based on the roomname
        socket.join(Newuser.roomname);
    });

    //Listening to "chat message"
    socket.on("chat message", (data) => {
        io.to(thisRoom).emit("chat message", {data: data, id: socket.id});
    });

    //Listening to "disconnet"
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        console.log(user);
        if(user) {
            console.log(user.username + ' has left the room');
        }
        console.log("disconnected");
    });
});

http.listen(3333);