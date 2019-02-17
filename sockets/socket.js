const { io } = require('../app')

io.on('connection', (client) => {
    const data = {
        ok: true,
        mssg: 'connected',
        id: client.id
    }
    client.emit('lifeStatus', data);
})