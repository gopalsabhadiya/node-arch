import {UserTypeEnum} from "../../util/enum/UserTypeEnum";
import {Address} from "../Address";
import {Business} from "../Business";
import {Expose} from "class-transformer";

export default class User {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: number;

    @Expose({name: 'type'})
    private _type?: UserTypeEnum;

    @Expose({name: 'contactNo'})
    private _contactNo: string;

    @Expose({name: 'fullName'})
    private _fullName?: string;

    @Expose({name: 'userName'})
    private _userName?: string;

    @Expose({name: 'emailId'})
    private _emailId?: string;

    @Expose({name: 'address'})
    private _address?: Address;

    @Expose({name: 'business'})
    private _business?: Business;

    @Expose({name: 'active'})
    private _active: boolean;

    constructor( contactNo: string, active: boolean, id?: number, type?: UserTypeEnum, fullName?: string, userName?: string, emailId?: string, address?: Address, business?: Business) {
        this._id = id;
        this._type = type;
        this._contactNo = contactNo;
        this._fullName = fullName;
        this._userName = userName;
        this._emailId = emailId;
        this._address = address;
        this._business = business;
        this._active = active;
    }


    get type(): UserTypeEnum {
        return <UserTypeEnum>this._type;
    }

    set type(value: UserTypeEnum) {
        this._type = value;
    }

    get contactNo(): string {
        return this._contactNo;
    }

    set contactNo(value: string) {
        this._contactNo = value;
    }

    get fullName(): string {
        return <string>this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get userName(): string {
        return <string>this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get emailId(): string {
        return <string>this._emailId;
    }

    set emailId(value: string) {
        this._emailId = value;
    }

    get address(): Address {
        return <Address>this._address;
    }

    set address(value: Address) {
        this._address = value;
    }

    get business(): Business {
        return <Business>this._business;
    }

    set business(value: Business) {
        this._business = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}
