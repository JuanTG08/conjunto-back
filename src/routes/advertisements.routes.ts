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

router.route('/handdler-C-advertisements')
    .post(AdvertisementsCtrl.create) // Creamos nuevo Anuncio

router.route('/handdler-R-advertisements/:transmitter_id')
    .get(AdvertisementsCtrl.listAll) // Enlistamos los anuncios dependiendo del que lo anuncio

router.route('/handdler-RUDD-advertisements/:_id/:transmitter_id')
    .get(AdvertisementsCtrl.findOneById) // Encontramos un anuncio especifico
    .put(multer.single('miniature'), AdvertisementsCtrl.modify) // Modificamos un anuncio
    .post(AdvertisementsCtrl.disable) // Desabilitamos anuncios
    .delete(AdvertisementsCtrl.delete) // Eliminamos anuncios

export default router;