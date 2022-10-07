import Hook from "../config/utils";
import UserModel from "../model/user.model";
import RolModel from "../model/rol.model";
import env from "../config/config";
// import { IToken, IDataUser } from "../interface/IToken";
// import RolModel from "../model/rol.model";
// import tokenAuth from "../middleware/token-auth.middleware";

class UserCtrl {
  // Creacion de un nuevo usuario
  static async create(req: any, res: any) {
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
    data.password = Hook.encrypt(data.password, env.SECRET_SERVER);
    return res.json(await UserModel.create(data)); // Ejecutamos la consulta y mostramos su resultado
  }

  // Enlistamos los usuarios que dependen de este
  static async list(req: any, res: any) {
    const { _id } = req.params; // Obtenemos su ID
    if (!_id || _id.length === 0)
      // Comprobamos que no este vacio
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.list({ toDepend: { _id } }));
  }

  static async modify(req: any, res: any) {}

  static async disable(req: any, res: any) {}

  static async delete(req: any, res: any) {}
}
export default UserCtrl;
