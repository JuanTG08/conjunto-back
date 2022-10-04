export default interface IEnv {
    PORT_SERVER: number | string | undefined;
    MONGODB_URI: string | undefined;
    SECRET_SERVER: string;
    MAX_FILE_SIZE: number | any;
    CAPTCHA_SECRET?: string | undefined;
}