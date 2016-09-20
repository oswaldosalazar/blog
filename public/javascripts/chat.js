$(function () {
    var socket = io()

    $('#formchat').submit( function(Event) {
        Event.preventDefault()
        let userMessage = $('#message').val()

        socket.emit('send message', {
            message: userMessage
        })

        $('#message').val('')

    })

    socket.on('send message', function(message) {
        $('#messages').append(`<li class="list-group-item">${message.message}</li>`)
    })


})
