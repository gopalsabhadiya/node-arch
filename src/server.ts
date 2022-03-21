import Logger from './util/Logger';
import app from './app';
import db from './data/models';
import {port} from "./config/Config";

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        Logger.info(`server running on port : ${port}`);
    }).on('error', (e: any) => Logger.error(e));
});

