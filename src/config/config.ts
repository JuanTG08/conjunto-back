import { config } from 'dotenv';
import IEnv from '../interface/IEnv';
config();
const env: IEnv = {
    PORT_SERVER : process.env.PORT_SERVER || 8000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/prueba_desarrollo",
    SECRET_SERVER: process.env.SECRET_SERVER || "prueba_desarrollo",
    MAX_FILE_SIZE: 1024 * 1024,
}
export default env;