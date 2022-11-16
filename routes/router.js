import combineRouters from 'koa-combine-routers';

import pingRouter from './ping/ping';
import messageRouter from './users/users';

const router = combineRouters(pingRouter, messageRouter);

export default router;
