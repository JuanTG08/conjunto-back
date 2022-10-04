// Creamos la instancia de la ruta por defecto en express
import { NextFunction, Request, Response, Router } from "express";
// Importamos funciones de nuestro controlador
import FilesCtrl from '../controller/files.controller';
import FileMdlw from "../middleware/files.middlware";

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE | DISABLE
*/

router.route('/handdler-CR-files')
    .post(FileMdlw.saveImage, FilesCtrl.create) // Creamos nuevo archivo o subimos el archivo
    .get(FilesCtrl.listAll) // Enlistamos todos los archivos

router.route('/handdler-R-files/:_id')
    .get(FilesCtrl.findOneById) // Encontramos un archivo en especifico

router.route('/handdler-DD-files/:_id/:name_image')
    .post(FilesCtrl.disable) // Desabilitamos archivos
    .delete(FilesCtrl.delete) // Eliminamos archivos

export default router;