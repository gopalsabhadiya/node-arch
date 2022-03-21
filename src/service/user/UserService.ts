import User from "../../dto/user/User";
import UserRepository from "../../data/repository/UserRepository";
import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";

@autoInjectable()
export default class UserService {
    private _repository: UserRepository;

    constructor(repository: UserRepository) {
        Logger.debug("Initialising user service");
        this._repository = repository;
    }

    public async userExist(contactNo: string) {
        return this._repository.userExist(contactNo);
    }

    public async registerUser(user: User): Promise<User> {
        return this._repository.createUser(user);
    }

    public async getUserByContactNo(contactNo: string): Promise<User> {
        Logger.debug("Fetching user by contactNo: " + contactNo);
        return this._repository.getUserByContactNo(contactNo);
    }
}
