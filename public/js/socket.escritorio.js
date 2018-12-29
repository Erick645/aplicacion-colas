//
//
// Comando para establecer la comunicacion

var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// socket.on('estadoActual', function(data) {
//     label.text(data.actual);
// });

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            $('small').text(resp);
            alert(resp);
            return;
        }

        $('small').text('Ticket ' + resp.numero);
        console.log(resp);
    });
});