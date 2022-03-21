import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import UserEntity from "../models/entity/UserEntity";
import {plainToInstance} from "class-transformer";
import {Address} from "../../dto/Address";
import {BadTokenError} from "../../errors/ApiError";
import User from "../../dto/user/User";

@autoInjectable()
export default class UserRepository {

    constructor() {
        Logger.debug("Initialising user repository");
    }

    public async userExist(contactNo: string): Promise<boolean> {
        return UserEntity.count({where: {contactNo: contactNo}}).then(count => count > 0);
    }

    public async createUser(user: User): Promise<User> {
        let userEntity = UserEntity.build({raw: true});
        userEntity.set({
            type: user.type,
            contactNo: user.contactNo,
            fullName: user.fullName,
            userName: user.userName,
            emailId: user.emailId,
        });
        await userEntity.save();
        let addressEntity = await userEntity.createAddress({
            userId: userEntity.id,
            pinCode: user.address.pinCode ?? null,
            city: user.address.city ?? null,
            state: user.address.state,
            country: user.address.country
        });


        let userDTO = plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
        userDTO.address = plainToInstance(Address, addressEntity.get({plain: true}), {excludeExtraneousValues: true});
        return userDTO;
    }

    async getUserByContactNo(contactNo: string): Promise<User> {
        let userEntity: UserEntity | null = await UserEntity.findOne({where: {contactNo: contactNo}});

        if (userEntity != null) {
            return plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
        } else {
            throw new BadTokenError();
        }
    }
}
