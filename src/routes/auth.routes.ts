// Creamos la instancia de la ruta por defecto en express
import { Router } from "express";
import AuthCtrl from "../controller/auth.controller";
// Importamos funciones de nuestro controlador
import UserCtrl from '../controller/user.controller';

const router = Router();

router.route('/login-app-mobile')
    .post(AuthCtrl.loginAppMobile) // Se realiza el login del aplicativo

export default router;