import combineRouters from 'koa-combine-routers';

import pingRouter from './ping/ping';
import messageRouter from './users/users';
import pdfRouter from './users/pdf';

const router = combineRouters(pingRouter, messageRouter, pdfRouter);

export default router;
