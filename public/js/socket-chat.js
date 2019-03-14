var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (respuestaServer) => {
        // console.log('Usuarios conectados :', respuestaServer);
        renderizarUsuarios(respuestaServer);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Jorge',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {
    renderizarUsuarios(personas);
});

// Mensaje privado
socket.on('mensajePrivado', (mensajePrivado) => {
    console.log('Mensaje privado ', mensajePrivado);
});