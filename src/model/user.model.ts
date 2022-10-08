import Hook from '../config/utils';
import User from "./schema/user.schema";

class UserModel {
    static create(data: any) {
        const user = new User(data);
        return user.save()
            .then(resp => {
                return Hook.Message(false, 200, "Se guardo correctamente");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static list(query: object) {
        return User.find(query)
            .then(resp => {
                if (resp.length > 0) return Hook.Message(false, 200, "Ok", resp);
                return Hook.Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneByEmail(email: string) {
        return User.findOne({email, status: true})
            .then(user => {
                if (user) return Hook.Message(false, 200, "Usuario encontrado", user);
                return Hook.Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            });
    }

    static findOneById(query: object) {
        return User.findById(query)
            .then(user => {
                if (user) return Hook.Message(false, 200, "Usuario encontrado", user);
                return Hook.Message(true, 501, "No se encontro nada.");
            }).catch(err => {
                return Hook.Message(true, 500, "Error al intentar generar esta acción");
            })
    }
    static modify(data: any, query: object) {
        return User.findByIdAndUpdate(query, data)
            .then(resp => {
                return Hook.Message(false, 200, "Se Actualizo correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static disable(query: object) {
        return User.findByIdAndUpdate(query, { status: false })
            .then(resp => {
                return Hook.Message(false, 200, "Se deshabilito correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }

    static delete(query: object) {
        return User.findByIdAndRemove(query)
            .then(resp => {
                return Hook.Message(false, 200, "Se Elimino correctamente");
            }).catch(err => {
                return Hook.Message(false, 500, "Error al intentar generar esta acción");
            });
    }
}

export default UserModel;