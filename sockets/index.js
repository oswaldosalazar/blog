var io = require('socket.io')()

io.on('connection', function(socket) {

    socket.on('send message', function (message) {
        console.log('message')
        io.emit('send message', message)
    })
})

module.exports = io
