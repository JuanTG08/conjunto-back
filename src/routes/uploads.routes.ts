// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import AdvertisementsCtrl from '../controller/advertisements.controller';
import multer from "../libs/multer";

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE | DISABLE
*/

router.route('/handdler-C-uploads')
    .post(multer.single('miniature'), AdvertisementsCtrl.create) // Creamos nuevo Anuncio

export default router;