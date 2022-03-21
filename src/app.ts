import express from 'express';
import Logger from "./util/Logger";
import bodyParser from 'body-parser';
import cors from 'cors';
import {corsUrl} from "./config/Config";
import routesV1 from './routes/v1';
import AppMiddlewares from "./config/AppMiddlewares";
import AuthMiddleware from "./auth/AuthMiddleware";
import {container} from "tsyringe";

process.on('uncaughtException', (e) => {
    Logger.error(e);
});

const app = express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000}));
app.use(cors({origin: corsUrl, optionsSuccessStatus: 200}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const authMiddleware = container.resolve(AuthMiddleware);

app.use(authMiddleware.authMiddleware);

// Routes
app.use('/v1', routesV1);


// catch 404 and forward to error handler
app.use(AppMiddlewares.undefinedRoutesErrorMiddleware);

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(AppMiddlewares.errorHandlerMiddleware);


export default app;
