// Importamos las librerias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// Obtenemos las variables de configuraciones
import env from './config/config';
// Creamos la variable APP para el inicio del servidor
const app = express();

// Configuraciones previas
app.set('port', env.PORT_SERVER);
app.use(morgan('dev'));
app.use(cors());

/*
*
*   Rutas
*
*/
// Importamos las rutas ***
import access_page_route from './routes/access-page.routes';
app.use('api/access-page', access_page_route);

export default app;