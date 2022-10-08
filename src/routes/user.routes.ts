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
    .post(UserCtrl.create) // Creamos un nuevo usuario

router.route('/handdler-L-user/:depend_id')
    .get(UserCtrl.list) // Enlistamos todos los usuarios

router.route('/handdler-U-user/:_id/:depend_id')
    .put(UserCtrl.modify)
    .post(UserCtrl.disable)
    .delete(UserCtrl.delete)


export default router;