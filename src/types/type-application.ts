import env from "../config/config";

export const APP_MOBILE = {
    type: 'application/mobile',
    keyEncrypt: env.APPLICATION_MOBILE
};
export const APP_WEB = {
    type: 'application/web',
    keyEncrypt: env.APPLICATION_WEB
};

export const TypesApplications = [
    APP_MOBILE,
    APP_WEB,
]