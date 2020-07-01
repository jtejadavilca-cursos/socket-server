import Server from './classes/server';

const server = new Server();


server.start((port: number) => {
    console.log(`Servidor express corriendo en el puerto ${port}...`);
});

