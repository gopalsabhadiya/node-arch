import 'reflect-metadata';
import express from 'express';
import {container} from 'tsyringe';
import ServerTestController from './server_test/TestServer';
import LoginController from "./auth/LoginRoute";
import RegisterUserController from "./user/RegisterUser";

const router = express.Router();

const serverTestController = container.resolve(ServerTestController);
const registerUserController = container.resolve(RegisterUserController);
const loginController = container.resolve(LoginController);

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use('/test', serverTestController.routes());
router.use('/login', loginController.routes());
router.use('/user', registerUserController.routes());

export default router;
