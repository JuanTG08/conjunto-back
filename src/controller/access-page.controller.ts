import Hook from "../config/utils";
import AccessPages from "../model/access-page.model";

class AccessPagesCtrl {
  static async createNewPage(req: any, res: any) {
    const { name, description, path, method, from } = req.body;
    const data = {
      name: Hook._length(name, 64, 4),
      description: Hook._length(description, 250, 4),
      path: Hook._length(path, 128, 1),
      method: Hook._length(method, 12, 1),
      from: Hook._length(from, 5, 1),
    };
    const dataVerify = Hook.verifyDataObject(data);
    if (dataVerify !== true)
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    const newPage = await AccessPages.create(data);
    return res.json(newPage);
  }

  static async listAllPages(req: any, res: any) {
    return res.json(await AccessPages.listAll());
  }

  static async findOnePageByPath(req: any, res: any) {
    const { path } = req.params;
    if (!Hook._length(path, 64, 1))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AccessPages.findOneByPath(path));
  }

  static async findOnePageById(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AccessPages.findOneById(_id));
  }

  static async modifyOneAccessPage(req: any, res: any) {
    const { _id } = req.params;
    const { name, description, path, method, from, status } = req.body;
    const data = {
      name: Hook._length(name, 64, 4),
      description: Hook._length(description, 250, 4),
      path: Hook._length(path, 128, 1),
      method: Hook._length(method, 12, 1),
      from: Hook._length(from, 5, 1),
    };
    const strObject = await Hook.structureObject(data);
    if (!strObject || !_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AccessPages.modify(strObject, _id));
  }

  static async disableAccessPages(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AccessPages.disable(_id));
  }

  static async deleteAccessPage(req: any, res: any) {
    const { _id } = req.params;
    if (!_id || _id.length === 0)
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AccessPages.delete(_id));
  }
}
export default AccessPagesCtrl;
