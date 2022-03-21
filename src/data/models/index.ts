import {associateUser, initUser} from "./entity/UserEntity";
import {associateAddress, initAddress} from "./entity/Address";
import {associateBusiness, initBusiness} from "./entity/Business";
import dbConfig from '../config/config';
import {environment} from '../../config/Config';
import Logger from "../../util/Logger";

const Sequelize = require('sequelize');

// @ts-ignore
const config = dbConfig[environment];

const sequelize = new Sequelize(config.database, config.username, config.password, config, {
    logging: Logger
});

initUser(sequelize);
initAddress(sequelize);
initBusiness(sequelize);

associateUser();
associateAddress();
associateBusiness();

export default {
    sequelize,
    Sequelize,
    User: sequelize.models.User,
    Address: sequelize.models.Address,
    Business: sequelize.models.Business,
}
