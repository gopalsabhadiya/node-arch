import {Request} from 'express';
import User from "../dto/User";
import SessionPayload from "./other/SessionPayload";

declare interface ProtectedRequest extends Request {
    user: User;
    sessionPayload: SessionPayload,
    accessToken: string;
}

declare interface Tokens {
    accessToken: string;
    refreshToken: string;
}
