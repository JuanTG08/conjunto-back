// Importamos las librerias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Creamos la variable APP para el inicio del servidor
const app = express();

// Configuraciones previas
app.set('port', 8000);
app.use(morgan('dev'));
app.use(cors());

/*
*
*   Rutas
*
*/

export default app;