import Router from 'koa-router';
import db from '../../db/db';

const router = new Router();

const request = (callback, ctx) => {
    try {
        const res = callback();
        return res;
    } catch (e) {
        ctx.response.status = +e.message;
        return false;
    }
};

// post router
router.post('/users', async (ctx) => {
    const user = ctx.request.body;
    const res = request(() => db.addUser(user), ctx);
    if (res) ctx.response.body = { ok: 'ok' };
});

// get router
router.get('/users/:id', async (ctx) => {
    const res = request(() => db.getUser(ctx.params.id), ctx);
    ctx.response.body = res;
});

router.post('/users', async (ctx) => {
    db.addUser(ctx.request.body);
});

router.delete('/users/todos/:id', async (ctx) => {
    db.delete(ctx.params.id);
});

router.get('/message/getFilesDataFiltered/:filter', async (ctx) => {
    const { filter } = ctx.params;
    const result = db.getFilesDataFiltered(filter);
    ctx.response.body = result;
});

export default router;
