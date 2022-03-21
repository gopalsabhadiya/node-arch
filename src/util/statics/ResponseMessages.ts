export default class ResponseMessages {
    public static get TEST_SERVER_SUCCESS():string {return "Your server is running fine"}
    public static get SEND_OTP_SUCCESS():string {return "OTP sent successfully"}
    public static get VERIFY_OTP_SUCCESS():string {return "OTP verification successfully"}
    public static get REGISTER_USER_SUCCESS():string {return "User registered successfully"}
    public static get INCORRECT_OTP():string {return "Invalid OTP"}
    public static get BAD_REQUEST_ERROR():string {return "Bad request, try again with proper parameters"}
}
