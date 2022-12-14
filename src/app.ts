// Importamos las librerias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import authMdlw from './middleware/token.auth.middleware';

// Obtenemos las variables de configuraciones
import env from './config/config';
// Obtenemos la conexion a la base de datos
import Mongo from './config/database';
// Nos conectamos a la base de datos
new Mongo().connect();

// Creamos la variable APP para el inicio del servidor
const app = express();

// Configuraciones previas
app.set('port', env.PORT_SERVER);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

/*
*
*   Rutas
*
*/
// Importamos las rutas ***
import access_page_route from './routes/access-page.routes'; // Ruta para el acceso de las paginas
import user_route from './routes/user.routes'; // Ruta para los anuncios
import auth_route from './routes/auth.routes'; // Ruta para los anuncios
import roles_route from './routes/roles.routes'; // Ruta para los roles
import advertisements_route from './routes/advertisements.routes'; // Ruta para los anuncios
import files_route from './routes/files.routes'; // Ruta para los anuncios
// Establecemos las rutas ***
app.use('/auth', auth_route)
app.use('/api/access-page', access_page_route); // Ruta relacionada a la autorizacion de los usuarios
app.use('/api/user', user_route); // Ruta relacionada a los usuarios
app.use('/api/roles', roles_route); // Ruta relacionada a la ejecución de los roles
app.use('/api/advertisements', advertisements_route); // Ruta relacionada los anuncios

// Esta url se usara para el almacenamiento de archivos publicos
app.use('/api/files', files_route);
app.use('/uploads', express.static(path.resolve('uploads/active-files/')));

export default app;