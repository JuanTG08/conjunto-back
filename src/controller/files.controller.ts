import Hook from "../config/utils";
import { IDataFiles } from "../interface/IDataFiles";
import FilesModel from "../model/files.model";

class FilesCtrl {
  static async create(req: any, res: any) {
    const { id_transmitter, name_transmitter }: IDataFiles = req.body;
    const data: IDataFiles = {
      id_transmitter: Hook._length(id_transmitter, 64, 4),
      name_transmitter: Hook._length(name_transmitter, 300, 1),
      name_image: req.file?.filename,
      path: req.file?.path,
      type_file: req.file?.mimetype,
      status: true,
    };
    const dataVerify = Hook.verifyDataObject(data);
    if (dataVerify !== true) {
      // await FilesModel.deleteFilesByPath(data.path);
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    }
    return res.json(await FilesModel.create(data));
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
    const { _id, name_image } = req.params;
    if (!Hook.verifyId(_id) || !Hook.verifyId(name_image))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    const lastPath = `uploads/active-files/${name_image}`;
    const newPath = `uploads/disable-files/${name_image}`;
    const verifyLastPath = await FilesModel.existFile(lastPath)
    if (!verifyLastPath)
      return res.json(Hook.Message(true, 500, "File Inexistente"));
    const moved = await FilesModel.moveFiles(lastPath, newPath);
    if (!moved || moved.statusCode !== 200) return res.json(moved);
    return res.json(await FilesModel.disable(_id, newPath));
  }

  static async delete(req: any, res: any) {
    const { _id, name_image } = req.params;
    if (!Hook.verifyId(_id) || !Hook.verifyId(name_image))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    const _delete = await FilesModel.deleteFilesByName(name_image);
    if (!_delete) return res.json(Hook.Message(true, 404, "Not found"));
    return res.json(await FilesModel.delete(_id));
  }
}
export default FilesCtrl;
