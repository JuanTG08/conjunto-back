// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
// Importamos funciones de nuestro controlador
import RolCtrl from '../controller/rol.controller';

const router = Router();


/*
    CRUD
    C: CREATE
    R: REALOAD
    U: UPDATE
    D: DELETE
*/

router.route('/handdler-CR-rol')
    .get(RolCtrl.listAllRol) // Enlistamos nuevos roles
    .post(RolCtrl.createNewRol) // Creamos nuevos roles

router.route('/handdler-RUDD-rol/:_id')
    .get(RolCtrl.findOneRolById) // Encontramos un rol por su ID
    .put(RolCtrl.modifyOneRol) // Modificamos un rol en especifico
    .post(RolCtrl.disableRol) // Desabilitamos un rol
    .delete(RolCtrl.deleteRol) // Eliminamos un rol

export default router;