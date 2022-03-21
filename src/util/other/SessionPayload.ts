export default class SessionPayload {
    private _contactNo: string;
    private _otp?: string;
    private _newUser?: boolean;

    constructor(contactNo: string, otp?: string, newUser?: boolean) {
        this._contactNo = contactNo;
        this._otp = otp;
        this._newUser = newUser;
    }

    get contactNo(): string {
        return this._contactNo;
    }

    set contactNo(value: string) {
        this._contactNo = value;
    }

    get otp(): string {
        return <string>this._otp;
    }

    set otp(value: string) {
        this._otp = value;
    }

    get newUser(): boolean {
        return this._newUser ?? false;
    }

    set newUser(value: boolean) {
        this._newUser = value;
    }
}
