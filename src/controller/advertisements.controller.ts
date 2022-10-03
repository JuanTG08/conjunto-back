import Hook from "../config/utils";
import { IDataAdvertisement } from "../interface/IDataAdvertisements";
import AdvertisementsModel from "../model/advertisements.model";

class AdvertisementCtrl {
  static async create(req: any, res: any) {
    const {
      title,
      description,
      miniature,
      transmitter,
      date_end,
      status,
    }: IDataAdvertisement = req.body;
    const data = {
      title: Hook._length(title, 64, 4), // Titulo
      description: Hook._length(description, 300, 1), // Descripcion
      miniature: Hook._length(miniature, 200, 1), // Imagen
      transmitter: Hook.verifyObjectKey(
        transmitter,
        ["_id", "nameTransmitter", "role"],
        3
      ), // Trasmisor
      date_end: Hook._length(date_end, 200, 1), // Fecha de fin
      status: Hook.isBoolean(status), // Estado del anuncio
    };
    const dataVerify = Hook.verifyDataObject(data, ["date_end", "status"]); // Fecha fin no es obligatoria
    if (dataVerify !== true)
      // Verificamos
      return res.json(Hook.Message(true, 0, "Campos Vacios", dataVerify));
    return res.json(await AdvertisementsModel.create(data)); // Ejecutamos y mostramos por pantalla
  }

  static async listAll(req: any, res: any) {
    const { transmitter_id } = req.params; // Obtenemos su ID
    if (!Hook.verifyId(transmitter_id))
      // Comprobamos que no este vacio
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(
      await AdvertisementsModel.findAny({ transmitter: { transmitter_id } })
    );
  }

  static async findOneById(req: any, res: any) {
    const { _id, transmitter_id } = req.params;
    if (!Hook.verifyId(_id) || !Hook.verifyId(transmitter_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AdvertisementsModel.findOneById(_id, transmitter_id));
  }

  static async modify(req: any, res: any) {
    const { _id, transmitter_id } = req.params; // Obtenemos los ID necesarios
    const {
      title,
      description,
      miniature,
      transmitter,
      date_end,
      status,
    }: IDataAdvertisement = req.body;
    const data = {
      title: Hook._length(title, 64, 4), // Titulo
      description: Hook._length(description, 300, 1), // Descripcion
      miniature: Hook._length(miniature, 200, 1), // Imagen
      transmitter: Hook.verifyObjectKey(
        transmitter,
        ["_id", "nameTransmitter", "role"],
        3
      ), // Trasmisor
      date_end: Hook._length(date_end, 200, 1), // Fecha de fin
      status: Hook.isBoolean(status), // Estado del anuncio
    };
    const strObject = await Hook.structureObject(data); // Estructuramos que campos iran a actualizarse
    if (!Hook.verifyId(_id) || !Hook.verifyId(transmitter_id)) // Verificamos los roles
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AdvertisementsModel.modify(strObject, _id, transmitter_id));
  }

  static async disable(req: any, res: any) {
    const { _id, transmitter_id } = req.params;
    if (!Hook.verifyId(_id) || !Hook.verifyId(transmitter_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AdvertisementsModel.disable(_id, transmitter_id));
  }

  static async delete(req: any, res: any) {
    const { _id, transmitter_id } = req.params;
    if (!Hook.verifyId(_id) || !Hook.verifyId(transmitter_id))
      return res.json(Hook.Message(true, 0, "Campos Vacios"));
    return res.json(await AdvertisementsModel.delete(_id, transmitter_id));
  }
}
export default AdvertisementCtrl;
