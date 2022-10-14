import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/config";
import Hook from "../config/utils";
import IApplicationType from "../interface/IApplicationType";
import IMessage from "../interface/IMessage";
import { IToken } from "../interface/IToken";

import UserModel from "../model/user.model";
import RolModel from "../model/rol.model";
import { APP_MOBILE, TypesApplications } from "../types/type-application";
import { IToBack } from "../interface/IDataRol";

class tokenAuth {
  static createTokenAuth(payload: IToken, keyEncrypt: string): string {
    // Creamos el token de autentificación para los usuarios
    return jwt.sign(payload, env.SECRET_SERVER)
  }
  static verifyToken(bearerToken: string, application_type: IApplicationType) {
    // Realizamos las verificaciones validas al token
    if (!bearerToken) return Hook.Message(true, 401, "Unauthorized"); // Debemos realizar el error correspondiente
    const tokenDess = bearerToken.split(" ")[1]; // Obtenemos el Token
    try {
      const token: any = jwt.verify(tokenDess, env.SECRET_SERVER); // Obtenemos la información del token
      if (!token.iat) return Hook.Message(true, 810, "Invalid Token"); // Verificamos si tiene algun tiempo maximo
      if ( // Si no tiene el token algun tiempo limite y la aplicación es de tipo mobile
        !this.verifyTimeToken(token.iat) &&
        application_type.type !== APP_MOBILE.type
      )
        return Hook.Message(true, 810, "Token Timed Out");
      return Hook.Message(false, 200, "Ok", token); // Retornamos el token
    } catch (error) {
      return Hook.Message(true, 810, "Invalid Token");
    }
  }

  static verifyTimeToken(iat: number) {
    // Verificamos el token por tiempo
    return new Date().getTime() < iat;
  }

  // Verificamos las url si tiene el permiso
  static pathValidToBack(toBack: IToBack[], url: string, _method: string): Boolean {
    url = url.split("/")[1];
    console.log(toBack);
    const res = toBack.find(
      ({ path, method }: any) => path === url && method === _method
    );
    return !!res;
  }

  // Verificamos si el esta logueado mediante el token
  static async isLoggedIn(req: Request, res: Response, next: NextFunction) {
    // Obtenemos la autorización del token, y a su vez que tipo de aplicación esta respondiendo
    const { authorization, application_type } = req.headers;
    // Verificamos si llegan el "application_type"
    if (!application_type)
      return res
        .status(412)
        .json(Hook.Message(true, 412, "Precondition Failed"));
    // Obtenemos el tipo de aplicación
    const typeApplication = Hook.getTypeApplication(application_type.toString());
    if (!typeApplication)
      return res
        .status(412)
        .json(Hook.Message(true, 412, "Precondition Failed"));
    // Obtenemos el token
    const token: IMessage = tokenAuth.verifyToken(
      <string>authorization,
      typeApplication
    ); // Realizamos la verificacion Superficial
    if (token.statusCode != 200 || !token.payload._id) return res.status(401).json(token); // Si da algun error lo imprimimos
    const user = await UserModel.findOneById(token.payload._id); // Buscamos el usuario en cuestion
    if (user.error || user.statusCode != 200) return res.json(user); // Si no existe el usuario en cuestion
    if (!user.payload.status)
      return res.json(Hook.Message(true, 500, "Disabled User")); // Si el usuario esta deshabilitado
    // Obtenemos las access_page de toBack
    const id_role = token.payload.role._id;
    // Obtenemos el rol del usuario
    const roles = await RolModel.findOneById(id_role);
    // Verificamos si el rol coincide
    if (roles.error || roles.statusCode !== 200)
      return res
        .status(412)
        .json(Hook.Message(true, 412, "Precondition Failed"));
    // Obtenemos las urls que tenga el rol especificada
    const { toBack } = roles.payload[0];
    // Verificamos que existan alguna
    if (!toBack || toBack.length <= 0)
      return res.status(401).json(Hook.Message(true, 500, "Disabled User Unauthorized"));
    // Obtenemos las url y metodos que pidieron
    const { url, method } = req;
    // Validamos y verificamos la autorización mediante las urls
    const validPath = tokenAuth.pathValidToBack(toBack, url, method);
    // Verificamos que el path tenga permiso
    if (!validPath) return res.json(Hook.Message(true, 500, "Disabled User"));
    // Finalizamos y a su vez pasamos a la siguiente función
    next();
  }
}

export default tokenAuth;
