import Hook from "../config/utils";
import { IDataRol, IToBack } from "../interface/IDataRol";
import RolModel from "../model/rol.model";

class RolCtrl {
  static async createNewRol(req: any, res: any) {
    const { name, description, toBack, toFront, status }: IDataRol = req.body;
    const data = {
      name: Hook._length(name, 64, 4),
      description: Hook._length(description, 300, 1),
      toBack: Hook._length(toBack, 999, 0),
      toFront: Hook._length(toFront, 999, 0),
      status: Hook.isBoolean(status),
    };
    const dataVerify = Hook.verifyDataObject(data, [
      "status",
      "toBack",
      "toFront",
    ]);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    const newRol = await RolModel.create(data);
    return res.json(newRol);
  }

  static async listAllRol(req: any, res: any) {
    return res.json(await RolModel.listAll());
  }

  static async findOneRolById(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await RolModel.findOneById(_id));
  }

  static async modifyOneRol(req: any, res: any) {
    const { _id } = req.params;
    const { name, description, toBack, toFront, status }: IDataRol = req.body;
    const data = {
      name: Hook._length(name, 64, 4),
      description: Hook._length(description, 300, 1),
      toBack: Hook._length(toBack, 999, 0),
      toFront: Hook._length(toFront, 128, 0),
      status: Hook.isBoolean(status),
    };
    const strObject = await Hook.structureObject(data);
    if (!strObject || !_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await RolModel.modify(strObject, _id));
  }

  static async disableRol(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await RolModel.disable(_id));
  }

  static async deleteRol(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await RolModel.delete(_id));
  }
}
export default RolCtrl;
