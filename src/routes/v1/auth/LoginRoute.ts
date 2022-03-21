import express, {Router} from "express";
import validator from '../../../util/validator';
import schema from './validation/schema';
import asyncHandler from '../../../util/asyncHandler';
import {SuccessResponse} from '../../../util/ApiResponse';
import {autoInjectable} from "tsyringe";
import Logger from "../../../util/Logger";
import LoginService from "../../../service/auth/LoginService";

@autoInjectable()
export default class LoginController {
    private _router: Router;
    private _loginService: LoginService;

    constructor(loginService: LoginService) {
        Logger.debug("Initialising Login Controller");
        this._router = express.Router();
        this._loginService = loginService;
    }

    routes() {
        Logger.debug("Configuring routes for User Login");
        this._router.post('/', validator(schema.userCredential), asyncHandler(this.loginController));
        return this._router;
    }

    private async loginController(req: any, res: any) {
        Logger.debug("Logging in User");
        new SuccessResponse('Login Success', {
            user: {name: "Gopal Sabhadiya"},
            // tokens: tokens,
        }).send(res);
    }
}
