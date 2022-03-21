import validator from "../util/validator";
import {ProtectedRequest} from "../util/app-request";
import {NextFunction, Response} from "express";
import Logger from "../util/Logger";
import {protectedEndpoints} from "../config/Config";
import schema from "./validation/Schema";
import {ValidationSource} from "../util/enum/ValidationSourceEnum";
import JWT from "../config/JWT";
import SessionPayload from "../util/other/SessionPayload";
import UserService from "../service/user/UserService";
import {autoInjectable} from "tsyringe";
import {BadRequestError} from "../errors/ApiError";
import ResponseMessages from "../util/statics/ResponseMessages";

@autoInjectable()
export default class AuthMiddleware {

    private _userService: UserService;

    constructor(userService: UserService) {
        this._userService = userService;
    }

    authMiddleware = [
        //Validate if Auth token is provided
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("Validating for auth token");
            if (protectedEndpoints.includes(req.url)) {
                validator(schema.authToken, ValidationSource.COOKIE)(req, res, next);
            } else {
                next();
            }
        },

        //Validate if CSRF token is provided
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("Validating for csrf token");
            if (protectedEndpoints.includes(req.url)) {
                validator(schema.csrfToken, ValidationSource.HEADER)(req, res, next);
            } else {
                next();
            }
        },

        //Validate auth token and save payload in request
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("AuthenticationMiddleware");
            if (protectedEndpoints.includes(req.url)) {
                await JWT.validateSessionToken(req.cookies["auth-token"] as string);
                let sessionPayload: SessionPayload = await JWT.decodeSessionToken(req.cookies["auth-token"]);
                req.accessToken = req.cookies["auth-token"];
                req.sessionPayload = sessionPayload;
                if(!sessionPayload.newUser) {
                    try {
                        req.user = await this._userService.getUserByContactNo(sessionPayload.contactNo);
                    }
                    catch (e: any) {
                        next(new BadRequestError(ResponseMessages.BAD_REQUEST_ERROR));
                    }
                }
            }
            next();
        }
    ];

}
