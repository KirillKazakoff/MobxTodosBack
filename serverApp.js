import http from 'http';
import Koa from 'koa';
import router from './routes/router';
import koaBody from 'koa-body';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));
app.use(router());

const port = process.env.PORT || 9092;
http.createServer(app.callback()).listen(port);
console.log('ready');
