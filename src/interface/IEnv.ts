export default interface IEnv {
    PORT_SERVER: number | string | undefined;
    MONGODB_URI: string | undefined;
    SECRET_SERVER: string;
    MAX_FILE_SIZE: number;
    PWD_ENCRYPT: string;
    APPLICATION_MOBILE: string;
    APPLICATION_WEB: string;
    CAPTCHA_SECRET?: string | undefined;
}