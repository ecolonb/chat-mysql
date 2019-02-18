socket.on('connect', function(dat) {
    console.log('Server connected');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVkZCIsImlhdCI6MTUxNjI5OTAyMiwiaWQiOjI3ODZ9.XSUPS_nLF31WQ01SrkROEzuvYAJzMN84rth8NuyRMhA';
    const userId = 'secretTdsadsadasdsdsadsadaoken'
    const dataToSend = {

        userId,
        token
    }
    socket.emit('authentication', dataToSend, callback);

    setTimeout(function() {
        const dataToSend = {
            id: 'dadasdsa',
            token: 'secretToken___'
        }
        console.log('Enviando datos al server: ', dataToSend);

        socket.emit('sendMessage', dataToSend, callback);
    }, 1000)
});
socket.on('authenticated', function(data) {
    // use the socket as usual
    console.log('|||||Authenticated function= =========>>>', data);
});
socket.on('lefiStatus', function(data) {
    console.log('Server says: ', data);
});

function callback(data) {
    console.log('data from server=>>>>>: ', data);
}