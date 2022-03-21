export default class ValidationRegex {
    //Common
    public static get STRING_WITH_SPACE_REGEX():RegExp {return /^[a-zA-Z ]*$/}
    public static get NUMBER_REGEX():RegExp {return /^[\d]*$/}

    public static get CONTACT_NO_REGEX():RegExp {return /^[\d]{10}$/;}
    public static get USER_NAME_REGEX():RegExp {return /^[a-zA-Z._]+$/}
}
