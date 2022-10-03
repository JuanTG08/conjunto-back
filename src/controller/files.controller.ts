import Hook from "../config/utils";
import { IDataFiles } from "../interface/IDataFiles";
import FilesModel from "../model/files.model";

class FilesCtrl {
  static async create(req: any, res: any) {
    const { id_transmitter, name_transmitter }: IDataFiles = req.body;
    const data: IDataFiles = {
      id_transmitter: Hook._length(id_transmitter, 64, 4),
      name_transmitter: Hook._length(name_transmitter, 300, 1),
      path: req.files?.path,
      type_file: "image",
      status: true,
    };
    console.log(data);
    /*
    const dataVerify = Hook.verifyDataObject(data);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    return res.json(await FilesModel.create(data));
    */
  }

  static async listAll(req: any, res: any) {
    return res.json(await FilesModel.findAny({}));
  }

  static async findOneById(req: any, res: any) {
    const { _id } = req.params;
    if (!Hook.verifyId(_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await FilesModel.findOneById(_id));
  }

  static async disable(req: any, res: any) {
    const { _id, path } = req.params;
    if (!Hook.verifyId(_id) || !Hook.verifyId(path))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    const moved = await FilesModel.moveFiles(
      `uploads/active-files/${path}`,
      `uploads/disable-files${path}`
    );
    if (!moved || moved.statusCode !== 200) return res.json(moved);
    return res.json(await FilesModel.disable(_id));
  }

  static async deleteRol(req: any, res: any) {
    const { _id } = req.params;
    if (!Hook.verifyId(_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await FilesModel.delete(_id));
  }
}
export default FilesCtrl;
