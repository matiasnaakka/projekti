const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Serve chat client app
app.use(express.static('public'));

/**
 * Array for connected users
 * Example: [{username: 'John Doe', id: 'ITGuJ_mwABYLBroYAAAB'}, ...]
 */
const users = [];

const getUserList = () => {
    let userList = '';
    for (const user of users) {
        userList += user.username + '\n';
    }
    return userList;
};

const getUserName = (socketId) => {
    return users.find(user => user.id === socketId)?.username;
};

const deleteUserById = (socketId) => {
    try {
        const index = users.findIndex(user => user.id === socketId);
        console.log('deleting user', users[index]);
        users.splice(index, 1);
    } catch (error) {
        console.warn('deleting user failed', error);
    }
};

io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);

    socket.on('join', (username) => {
        users.push({ username: username, id: socket.id });
        console.log('users connected:', users);
        socket.emit('response', 'Joined with username ' + username);
        socket.emit('chat message', `Tervetuloa ${username}! onpas mukava nähdä sinut täällä.  Käyttäjiä Tällä hetkellä aktiivisena: ${getUserList()}`)
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
        deleteUserById(socket.id);
    });
    socket.on('chat message', (msg) => {
        socket.emit('chat message', `You: ${msg}`);
        socket.broadcast.emit('chat message', `${getUserName(socket.id)}: ${msg}`);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});