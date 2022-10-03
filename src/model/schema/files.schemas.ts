import mongoose, { Schema } from "mongoose";

const FilesSchema = new mongoose.Schema({
    path: { // Miniatura, su url
        type: String,
        required: true,
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

const User = mongoose.model('Advertisements', FilesSchema);
export default User;