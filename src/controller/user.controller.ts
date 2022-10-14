import Hook from "../config/utils";
import UserModel from "../model/user.model";
import { Request, Response } from "express";
// import { IToken, IDataUser } from "../interface/IToken";
// import RolModel from "../model/rol.model";
// import tokenAuth from "../middleware/token-auth.middleware";

class UserCtrl {
  // Creacion de un nuevo usuario
  static async create(req: Request, res: Response) {
    const { email, password, name, last_name, toDepend, role } = req.body; // Obtenemos los datos
    let data = {
      // Los enlistamos y verificamos con validaciones
      email: Hook.isMail(email),
      password: Hook._length(password, 64, 8),
      name: Hook._length(name, 64, 1),
      last_name: Hook._length(last_name, 64, 1),
      toDepend: Hook.verifyObjectKey(toDepend, ["_id", "name"]),
      role: Hook.verifyObjectKey(role, ["_id", "nombre"]),
    };
    const dataVerify = Hook.verifyDataObject(data, ["last_name"]); // Obtenemos el resultado de la verificacion
    if (dataVerify !== true)
      // Comprobamos que si es apto para guardar
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    // Encriptamos la contraseña
    data.password = Hook.encryptPassword(data.password);
    return res.json(await UserModel.create(data)); // Ejecutamos la consulta y mostramos su resultado
  }

  // Enlistamos los usuarios que dependen de este
  static async list(req: Request, res: Response) {
    const { depend_id } = req.params; // Obtenemos su ID
    if (!Hook.verifyId(depend_id))
      // Comprobamos que no este vacio
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.list({ "toDepend._id": depend_id }));
  }

  static async modify(req: Request, res: Response) {
    const { _id, depend_id } = req.params; // Obtenemos los ID necesarios
    const { email, password, name, last_name, status } = req.body; // Obtenemos los datos
    let data = {
      // Los enlistamos y verificamos con validaciones
      email: Hook.isMail(email),
      password: Hook._length(password, 64, 8),
      name: Hook._length(name, 64, 1),
      last_name: Hook._length(last_name, 64, 1),
      status: Hook.isBoolean(status), // Estado del cliente
    };
    const strObject = await Hook.structureObject(data); // Estructuramos que campos iran a actualizarse
    if (!strObject || !Hook.verifyId(_id) || !Hook.verifyId(depend_id))
      // Verificamos los roles
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(
      await UserModel.modify(strObject, {
        _id,
        "toDepend._id": depend_id,
      })
    );
  }

  static async disable(req: Request, res: Response) {
    const { _id, depend_id } = req.params; // Obtenemos los ID necesarios
    if (!Hook.verifyId(_id) || !Hook.verifyId(depend_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.disable({
      _id,
      "toDepend._id": depend_id,
    }));
  }

  static async delete(req: Request, res: Response) {
    const { _id, depend_id } = req.params; // Obtenemos los ID necesarios
    if (!Hook.verifyId(_id) || !Hook.verifyId(depend_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.delete({
      _id,
      "toDepend._id": depend_id,
    }));
  }
}
export default UserCtrl;
