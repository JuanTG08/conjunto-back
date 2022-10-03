import mongoose, { Schema } from "mongoose";

const AdvertisementsSchema = new mongoose.Schema({
    title: { // Titulo del Anuncio
        type: String,
        required: true,
    },
    description: { // Descripcion del anuncio
        type: String,
        required: true,
    },
    miniature: { // Miniatura, su url
        type: String,
        required: true,
    },
    transmitter: { // Quien lo envia
        type: Object,  // { _id, nameTransmitter, role }
        required: true,
    },
    date_end: { // Fecha de fin
        type: String,
    },
    status: { // Estado
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const User = mongoose.model('Advertisements', AdvertisementsSchema);
export default User;