let users = [];

//This function will add user to the "users" array
function joinUser(socketId, userName, roomName) {
    const user = {
        socketId: socketId,
        userName: userName,
        roomName: roomName
    }
    users.push(user);
    return user;
}

//This function will remove user from the "users" array
function removeUser(id) {
    const getID = users => users.socketId === id;
    const index = users.findIndex(getID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = {joinUser, removeUser}