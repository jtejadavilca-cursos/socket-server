import {Router, Request, Response} from 'express';

const router = Router();

router.get('/mensajes', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        msg: 'Todo está bien'
    });
});

router.post('/mensajes', (req: Request, resp: Response) => {
    let data = {...req.body};
    resp.json({
        ok: true,
        msg: 'Todo esta bien por el POST',
        data,
    });
});

router.put('/mensajes/:id', (req: Request, resp: Response) => {
    let data = {...req.body};
    let id = req.params.id;
    resp.json({
        ok: true,
        msg: 'Todo esta bien por el PUT',
        data,
        id
    });
});
export default router;