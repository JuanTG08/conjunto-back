import Hook from "../config/utils";
import AdvertisementsPages from "./schema/advertisements.schema";

class RolModel {
  static create(data: any) {
    const page = new AdvertisementsPages(data);
    return page
      .save()
      .then((resp) => {
        return Hook.Message(false, 200, "Se guardo el correctamente");
      })
      .catch((err) => {
        console.log(err);
        return Hook.Message(
          false,
          500,
          "Error al intentar generar esta acción"
        );
      });
  }

  static findOneById(_id: string, transmitter_id: string) {
    return AdvertisementsPages.find({
      _id,
      transmitter: { _id: transmitter_id },
    })
      .then((resp) => {
        if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
        return Hook.Message(false, 501, "No se encontro nada.");
      })
      .catch((err) => {
        return Hook.Message(
          false,
          500,
          "Error al intentar generar esta acción"
        );
      });
  }

  static findAny(query: any) {
    return AdvertisementsPages.find(query)
      .then((resp) => {
        if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
        return Hook.Message(false, 501, "No se encontro nada.");
      })
      .catch((err) => {
        return Hook.Message(
          false,
          500,
          "Error al intentar generar esta acción"
        );
      });
  }

  static modify(data: any, _id: string, transmitter_id: string) {
    return AdvertisementsPages.findByIdAndUpdate(
      { _id, transmitter: { _id: transmitter_id } },
      data
    )
      .then((resp) => {
        return Hook.Message(false, 200, "Se Actualizo correctamente");
      })
      .catch((err) => {
        return Hook.Message(
          false,
          500,
          "Error al intentar generar esta acción"
        );
      });
  }

  static disable(_id: string, transmitter_id: string) {
    return AdvertisementsPages.findByIdAndUpdate({ _id, transmitter: { _id: transmitter_id } }, { status: false })
      .then((resp) => {
        return Hook.Message(false, 200, "Se deshabilito correctamente");
      })
      .catch((err) => {
        return Hook.Message(
          false,
          500,
          "Error al intentar generar esta acción"
        );
      });
  }

  static delete(_id: string, transmitter_id: string) {
    return AdvertisementsPages.findByIdAndRemove({ _id, transmitter: { _id: transmitter_id } })
      .then((resp) => {
        return Hook.Message(false, 200, "Se Elimino correctamente");
      })
      .catch((err) => {
        return Hook.Message(
          false,
          500,
          "Error al intentar generar esta acción"
        );
      });
  }
}

export default RolModel;
