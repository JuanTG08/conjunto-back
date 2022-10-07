// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import UserCtrl from '../controller/user.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE | DISABLE
*/

router.route('/handdler-C-user')
    .post(UserCtrl.create) // Creamos nuevo Anuncio

export default router;