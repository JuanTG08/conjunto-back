import Hook from "../config/utils";
import UserModel from "../model/user.model";
import RolModel from "../model/rol.model";
// import { IToken, IDataUser } from "../interface/IToken";
// import RolModel from "../model/rol.model";
// import tokenAuth from "../middleware/token-auth.middleware";

class UserCtrl {
  // Creacion de un nuevo usuario
  static async createNewUser(req: any, res: any) {
    const { email, password, name, last_name, toDepend, role } = req.body; // Obtenemos los datos
    const data = {
      // Los enlistamos y verificamos con validaciones
      email: Hook._length(email, 64, 4),
      password: Hook._length(password, 64, 8),
      name: Hook._length(name, 64, 1),
      last_name: Hook._length(last_name, 64, 1),
      toDepend: Hook.verifyObjectKey(toDepend, ["_id", "name"]),
      role: Hook.verifyObjectKey(role, ["_id", "nombre"]),
    };
    const dataVerify = Hook.verifyDataObject(data); // Obtenemos el resultado de la verificacion
    if (dataVerify !== true)
      // Comprobamos que si es apto para guardar
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    return res.json(await UserModel.create(data)); // Ejecutamos la consulta y mostramos su resultado
  }

  // Enlistamos los usuarios que dependen de este
  static async listUsers(req: any, res: any) {
    const { _id } = req.params; // Obtenemos su ID
    if (!_id || _id.length === 0)
      // Comprobamos que no este vacio
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.list({ toDepend: { _id } }));
  }

  // Buscamos un usuario unicamente
  static async findOneById(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await UserModel.findOneById(_id));
  }

  // Funcionalidad del Login
  static async login(req: any, res: any) {
    const { email, password } = req.body;
    const data = {
      // Adjuntamos los datos
      email: Hook._length(email, 64, 4),
      password: Hook._length(password, 64, 8),
    };
    const dataVerify = Hook.verifyDataObject(data); // Verificamos que sean correctos
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    const getUser = await UserModel.findOneByLogin(email);
    if (
      !getUser ||
      getUser.error ||
      getUser.statusCode != 200 ||
      !getUser.payload
    )
      return res.json(getUser);
    if (getUser.payload.length <= 0 || getUser.payload.password != password)
      return res.json(
        Hook.Message(true, 403, "Usuario o Contraseña incorrectos")
      );
    if (!getUser.payload.status === true)
      return res.json(Hook.Message(true, 401, "Usuario no autorizado"));
    // Si el usuario es encontrado y la contraseña coincide, entonces
    // Retornamos el token
    // Obtenemos las rutas asociadas al rol del usuario
    const role = await RolModel.findOneById(getUser.payload.role.toString());
    if (
      !role ||
      role.error ||
      role.statusCode != 200 ||
      role.payload.length <= 0
    )
      return res.json(role);
    const { toFront, toBack, name } = role.payload[0];
    const access_page = {
      toFront,
      toBack,
    };
    // Creamos el token
    /*
    const token = await tokenAuth.createTokenAuth({
      access_page,
      _id: getUser.payload._id,
      iat: Hook.getTime(30),
      role: name,
    });
    const dataUser: IDataUser = {
      name: getUser.payload.name,
      lastname: getUser.payload.last_name,
      email: getUser.payload.email,
    };
    // Mostramos por pantalla
    */
    return res.json(
      Hook.Message(false, 200, "Token" /*, { token, dataUser } */)
    );
  }

  static async modify(req: any, res: any) {}

  static async disable(req: any, res: any) {}

  static async delete(req: any, res: any) {}
}
export default UserCtrl;
