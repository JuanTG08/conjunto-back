import Hook from "../config/utils";
import Files from "./schema/files.schemas";
import fs from "fs-extra";

class FilesModel {
  static create(data: any) {
    const schema = new Files(data);
    return schema
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

  static findOneById(_id: string) {
    return Files.find({
      _id,
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
    return Files.find(query)
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

  static modify(data: any, _id: string) {
    return Files.findByIdAndUpdate(
      { _id },
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

  static async moveFiles(src: string, dest: string) {
    return await fs.move(src, dest)
      .then(() => Hook.Message(false, 200, "Moved"))
      .catch(err => Hook.Message(true, 500, "Error internal"))
  }

  static disable(_id: string) {
    return Files.findByIdAndUpdate(
      { _id },
      { status: false }
    )
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

  static delete(_id: string) {
    return Files.findByIdAndRemove({ _id })
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

export default FilesModel;