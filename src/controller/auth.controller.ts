import Hook from "../config/utils";
import { IDataAdvertisement } from "../interface/IDataAdvertisements";
import RolModel from "../model/rol.model";
import UserModel from "../model/user.model";

class AuthCtrl {
  static async loginAppMobile(req: any, res: any) {
    const { email, password } = req.body;
    const data = {
      // Adjuntamos los datos
      email: Hook._length(email, 64, 4),
      password: Hook._length(password, 64, 8),
    };
    const dataVerify = Hook.verifyDataObject(data); // Verificamos que sean correctos
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    const getUser = await UserModel.findOneByEmail(email);
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
    const { _id, name } = role.payload;
    return res.json(
      Hook.Message(false, 200, "Token" /*, { token, dataUser } */)
    );
  }
}
export default AuthCtrl;
