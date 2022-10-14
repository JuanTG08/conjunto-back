import Hook from "../config/utils";
import { IDataUser } from "../interface/IToken";
import tokenAuth from "../middleware/token.auth.middleware";
import UserModel from "../model/user.model";

class AuthCtrl {
  static async loginAppMobile(req: any, res: any) {
    const { email, password } = req.body;
    const { application_type } = req.headers;
    const applicationType = Hook.getTypeApplication(application_type)
    if (!application_type || !applicationType)
      return res
        .status(412)
        .json(Hook.Message(true, 412, "Precondition Failed"));
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
    if (getUser.payload.length <= 0 || !Hook.verifyHash(getUser.payload.password, password))
      return res.json(
        Hook.Message(true, 403, "Usuario o Contraseña incorrectos")
      );
    if (!getUser.payload.status === true)
      return res.json(Hook.Message(true, 401, "Usuario no autorizado"));
    // Si el usuario es encontrado y la contraseña coincide, entonces
    // Retornamos el token
    const { _id, role } = getUser.payload;
    const token = await tokenAuth.createTokenAuth({
      _id: _id,
      role: {
        _id: role._id,
        name: role.name
      },
    }, applicationType.keyEncrypt);
    const dataUser: IDataUser = {
      name: getUser.payload.name,
      lastname: getUser.payload.last_name,
      email: getUser.payload.email,
    };
    return res.json(
      Hook.Message(false, 200, "Success login", { token, dataUser })
    );
  }
}
export default AuthCtrl;
