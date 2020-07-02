import { Socket } from "socket.io";
import socketIO from 'socket.io';



export const desconectar = ( client: Socket ) => {
    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
}

export const mensaje = ( client: Socket, io: socketIO.Server ) => {
    client.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido ', mensaje);
        io.emit('mensaje-nuevo', mensaje);
    });
}


