import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        msg: 'Todo está bien'
    });
});

router.post('/mensajes', (req: Request, resp: Response) => {
    let payload = {...req.body};

    
    const server = Server.instance;
    server.getIO().emit('mensaje-nuevo', payload);

    resp.json({
        ok: true,
        msg: 'Todo esta bien por el POST',
        payload,
    });
});

router.post('/mensajes/:id', (req: Request, resp: Response) => {
    const payload = {...req.body};
    const id = req.params.id;

    const server = Server.instance;
    server.getIO().in( id ).emit('mensaje-privado', payload);

    resp.json({
        ok: true,
        msg: 'Todo esta bien por el PUT',
        payload,
        id
    });
});
export default router;