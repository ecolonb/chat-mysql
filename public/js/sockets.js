socket.on('connect', function(dat) {
    console.log('Server connected');
});
socket.on('lifeStatus', function(data) {
    console.log('Server says: ', data);
});