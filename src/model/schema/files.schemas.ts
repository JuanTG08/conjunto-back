import mongoose, { Schema } from "mongoose";

const FilesSchema = new mongoose.Schema({
    path: { // PATH
        type: String,
        required: true,
        unique: true,
    },
    name_image: { // Nombre imagen
        type: String,
        required: true,
        unique: true,
    },
    type_file: {
        type: String,
        required: true
    },
    id_transmitter: {
        type: String,
        required: true
    },
    name_transmitter: {
        type: String,
        required: true
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

const User = mongoose.model('Files', FilesSchema);
export default User;