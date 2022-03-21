import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/RegisterUserSchema";
import {FailureMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import Logger from "../../../util/Logger";
import {instanceToPlain, plainToInstance} from 'class-transformer';
import User from "../../../dto/user/User";
import {autoInjectable} from "tsyringe";
import UserService from "../../../service/user/UserService"
import JWTUtil from "../../../util/JWTUtil";
import SessionPayload from "../../../util/other/SessionPayload";
import CSRFPayload from "../../../util/other/CSRFPayload";
import {ProtectedRequest} from "../../../util/app-request";

@autoInjectable()
export default class RegisterUserController {
    private _router: Router;
    private _userService: UserService;

    constructor(userService: UserService) {
        Logger.debug("Initialising Register User Controller");
        this._router = express.Router();
        this._userService = userService;
    }

    routes() {
        Logger.debug("Configuring routes for User Registration");
        this._router.post('/send-otp', validator(schema.sendOTP), asyncHandler(async (req, res) => this.sendOTPController(req, res)));
        this._router.post('/verify-otp', validator(schema.verifyOTP), asyncHandler(async (req: ProtectedRequest, res) => this.verifyOTPController(req, res)));
        this._router.post('/register', validator(schema.register), asyncHandler(async (req: ProtectedRequest, res) => this.registerUserController(req, res)));
        return this._router;
    }

    private async sendOTPController(req: any, res: any) {
        let otp: number = Math.floor(1000 + Math.random() * 9000);

        Logger.debug("Sending OTP: " + otp.toString());

        let userExists: boolean = await this._userService.userExist(req.body.contactNo);
        Logger.debug("User Exists: " + userExists);

        //ToDo: send otp to contact number
        let sessionToken: string = await JWTUtil.generateJWTSessionToken(new SessionPayload(req.body.contactNo, otp.toString(),!userExists));
        let csrfToken: string = await JWTUtil.generateJWTCSRFToken(new CSRFPayload(req.body.contactNo));

        res.cookie("auth-token", sessionToken, {
            // secure: true,
            httpOnly: true
        });
        res.setHeader("csrf-token", csrfToken);
        return new SuccessResponse(ResponseMessages.SEND_OTP_SUCCESS, {csrfToken: csrfToken}).send(res);
    }

    private async verifyOTPController(req: ProtectedRequest, res: any) {
        Logger.debug("Verifying OTP");

        if (req.sessionPayload.otp == req.body.otp) {
            let user: User;

            if(req.sessionPayload.newUser) {
                let newUser: User = new User(req.sessionPayload.contactNo, true);
                user = await this._userService.registerUser(newUser);
            }
            else {
                user = await  this._userService.getUserByContactNo(req.sessionPayload.contactNo);
            }

            let sessionToken: string = await JWTUtil.generateJWTSessionToken(new SessionPayload(user.contactNo, undefined, false));
            let csrfToken: string = await JWTUtil.generateJWTCSRFToken(new CSRFPayload(user.contactNo));

            res.cookie("auth-token", sessionToken, {
                // secure: true,
                httpOnly: true
            });
            return new SuccessResponse(ResponseMessages.VERIFY_OTP_SUCCESS, {data: user, token: {csrfToken: csrfToken}}).send(res);
        } else {
            return new FailureMsgResponse(ResponseMessages.INCORRECT_OTP).send(res);
        }
    }

    private async registerUserController(req: ProtectedRequest, res: any) {
        Logger.debug(`Registering User.....`);

        //ToDo: send otp to contact number
        let user: User = plainToInstance(User, req.body);
        user.contactNo = "8000523940";
        user = await this._userService.registerUser(user);

        return new SuccessResponse(ResponseMessages.REGISTER_USER_SUCCESS, instanceToPlain(user)).send(res);
    }
}
