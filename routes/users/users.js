import Router from 'koa-router';
import db from '../../db/db';

const router = new Router();

const request = (callback, ctx) => {
    try {
        const res = callback();
        if (ctx.method === 'GET') return res;
        ctx.response.body = { ok: 'ok' };
        return true;
    } catch (e) {
        ctx.response.status = +e.message;
        return false;
    }
};

// post router
router.post('/users', async (ctx) => {
    const user = ctx.request.body;
    request(() => db.addUser(user), ctx);
});

router.post('/users/:userId', async (ctx) => {
    const todo = ctx.request.body;
    const { userId } = ctx.params;
    request(() => db.addTodo(userId, todo), ctx);
});

// get router
router.get('/users/:id', async (ctx) => {
    const res = request(() => db.getUser(ctx.params.id), ctx);
    ctx.response.body = res;
});

router.delete('/users/:userId/:id', async (ctx) => {
    const { userId, id } = ctx.params;
    request(() => db.deleteTodo(userId, id), ctx);
});

router.patch('/users/:userId/:id', async (ctx) => {
    const { userId, id } = ctx.params;
    request(() => db.checkTodo(userId, id), ctx);
    console.log('patched');
});

export default router;
