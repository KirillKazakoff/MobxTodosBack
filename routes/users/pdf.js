import Router from 'koa-router';

const pdfRouter = new Router();

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

pdfRouter.post('/pdf', async (ctx) => {
    console.log('hello');
});

export default pdfRouter;
