// Cliente TCP
const net = require('net');

// variables servidor
const direccion = '127.0.0.1';
const puerto = 9000;

// Leemos por consola, y despues iniciamos el cliente
process.stdout.write('Cual es tu nombre : ');
process.stdin.on('data', (data) => {
    const respuesta = data.toString().trim();
    iniciarCliente(respuesta);
});

function iniciarCliente(datoEnviar) {
    const client = new net.Socket();
    // conectamos con el servidor
    client.connect(puerto, direccion, function() {
        const address = client.address();
        const port = address.port;
        const ipaddr = address.address;
        console.log(" - Cliente TCP INICIADO - ");
        console.log("   El cliente esta escuchando : " + ipaddr + ":" + port);
        // enviamos el dato
        client.write(datoEnviar);
        console.log("Dato enviado!!!");
    });
    // recibimos dato del servidor
    client.on('data', data => {
        console.log('Datos recibidos del servidor : ' + data);
        client.destroy();
    });
    // cerramos la conexion con el servidor
    client.on('close', () => {
        console.log('Conexión cerrada');
        process.exit();
    });
}