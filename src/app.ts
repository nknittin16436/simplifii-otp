import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { LoginRouter } from './routes/login.router';
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", LoginRouter);


export default app;