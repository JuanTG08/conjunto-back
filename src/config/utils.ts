import IMessage from "../interface/IMessage";
import bcryptjs from "bcryptjs";
import IApplicationType from "../interface/IApplicationType";
import { TypesApplications } from "../types/type-application";
class Utils {
  static Message(
    error: Boolean,
    statusCode: number,
    message: string,
    payload: Boolean | any = false
  ): IMessage {
    return {
      error,
      statusCode,
      message,
      payload,
    };
  }
  /* Realizamos todas las funciones relacionadas a la encriptación */
  static encryptPassword(password: string) {
    return bcryptjs.hashSync(password, 8);
  }
  
  static verifyHash(encrypt: string, value: string): boolean {
    return bcryptjs.compareSync(value, encrypt);
  }

  /*
  static encrypt(value: string, key: string): string {
    bcryptjs.hash()
    const encrypt = CryptoJS.AES.encrypt(value, key);
    console.log(encrypt);
    return encrypt.toString();
  }

  static decrypt(encrypt: string, key: string): boolean | string {
    try {
      const decrypt = CryptoJS.AES.decrypt(encrypt, key).toString();
      return decrypt;
    } catch (error: any) {
      return false;
    }
  }

  /* Realizamos todo lo relacionado al tiempo */
  static getStimationTimeMins(timeNow: number, expiration_time_min: number) {
    const estimateTimeExpirationMin = expiration_time_min * 1000 * 60; // Calculamos los minutos pasados por el argurmento, lo transformamos a minutos
    return timeNow + estimateTimeExpirationMin; // Le establecemos esos minutos al tiempo actual
  }

  /* Verificamos el rol correspondiente */
  static isVerRol(req: any, rolArray: any) {
    const role = req.body.sessionID.role || "";
    return rolArray.filter((rol: any) => role === rol).length > 0;
  }

  /* Verificacion de las variables */
  static isNumeric(value: string) {
    return typeof value === "number" ? value : undefined;
  }
  static isString(value: string) {
    return typeof value === "string" ? value : undefined;
  }
  static isBoolean(value: any) {
    return typeof value === "boolean" ? value : undefined;
  }
  /* Verificamos la longitud del campo dado */
  static _length(value: any, max: number, min: number) {
    if (value === undefined) return undefined;
    if (typeof value == "object")
      return value.length <= max && value.length >= min ? value : undefined;
    value = value.toString();
    return value.length <= max && value.length >= min ? value : undefined;
  }

  static isMail(email: string): undefined | string {
    const expresionMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return expresionMail.test(email) ? email : undefined;
  }

  /* Verificamos las laves de los objetos */
  static verifyObjectKey(obj: any, keys: string[], keyLength: number = 1) {
    if (!obj) return undefined;
    let response:any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (keys.filter(_key => _key === key)) response[key] = value;
    });
    return Object.entries(response).length >= keyLength ? response : undefined;
  }
  /* Estructuramos los datos de un objeto */
  static structureObject(obj: any) {
    let response: any = {};
    Object.entries(obj).forEach(([key, val]) => {
      if (val !== undefined) response[key] = val;
    });
    return Object.entries(response).length > 0 ? response : undefined;
  }

  /* Verificacion del total de datos en un Array */
  static verifyDataObject = (obj: any, exception: string[] = []) => {
    let error: any = [];
    Object.entries(obj).forEach(([key, val]) => {
      if (!exception.includes(<never>key)) {
        if (val === undefined || val === null) error.push(<never>key);
      }
    });
    return error.length === 0 ? true : error;
  };

  // Verificacion del ID
  static verifyId(id: string): boolean {
    return !(!id || id === undefined || id === null || id.length <= 0);
  }

  /* Obtenemos el tiempo deseado */
  static getTime = (min: number = 0) => {
    const miliseconds = 60000 * min;
    return new Date(new Date().getTime() + miliseconds).getTime();
  };

  // Obtenemos el tipo de aplicacion
  static getTypeApplication(application_type: string) : IApplicationType | undefined {
    return TypesApplications.filter(
      ({ type }) => application_type === type
    )[0];
  }
}

export default Utils;