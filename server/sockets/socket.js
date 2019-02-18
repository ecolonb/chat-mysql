const { io } = require('../../app')
const { setUserScokect, deleteSocketSession } = require('./utils')
const socketAuth = require('socketio-auth');
const jwt = require('jsonwebtoken');

// auth sockets
socketAuth(io, {
    authenticate: authenticateFN,
    postAuthenticate: postAuthenticateFN,
    disconnect: disconnectFN
})
io.on('connection', (client) => {
        const data = {
            ok: true,
            mssg: 'connected',
            id: client.id
        }
        client.emit('lifeStatus', data);
        client.on('sendMessage', (data, callback) => {
            callback('Ok: mesages received', data)

        })
        client.on('disconnect', function() {
            deleteSocketSession(client.id);
        });
    })
    // dummy user verification
async function verifyUser(token, idSocket) {
    return new Promise((resolve, reject) => {
        // setTimeout to simulate database query using token on fornClient: 'secretToken'
        setTimeout(() => {
            const users = [{
                id: 1,
                name: 'mariotacke',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVkZCIsImlhdCI6MTUxNjI5OTAyMiwiaWQiOjI3ODZ9.XSUPS_nLF31WQ01SrkROEzuvYAJzMN84rth8NuyRMhA',
                idSocket
            }, ];

            const user = users.find((user) => user.token === token);
            if (!user) {
                return reject('USER_NOT_FOUND');
            }

            return resolve(user);
        }, 200);
    });
}

async function authenticateFN(socket, data, callback) {
    const { token } = data;
    try {
        const decode = await jwt.verify(token, 'lallaveweb')
        console.log('decode: ', decode)
    } catch (error) {
        console.log('error; ', error)
    }
    try {
        const user = await verifyUser(token, socket.id);

        socket.user = user;

        return callback(null, true);
    } catch (e) {
        // console.log(`authenticate: async(socket, data, callback) => {Socket ${socket.id} unauthorized.`);
        return callback({ message: 'UNAUTHORIZED' });
    }
}
async function postAuthenticateFN(socket) {
    // console.log(`authenticate: async(socket, data, callback) => {Socket ${socket.id} authenticated.`);
    // console.log('socket.user: ', socket.user)
    setUserScokect(socket.user.id, socket.user.idSocket)
    return true
}

async function disconnectFN(socket) {
    // console.log(`authenticate: async(socket, data, callback) => { Socket ${socket.id} disconnected.`);
}