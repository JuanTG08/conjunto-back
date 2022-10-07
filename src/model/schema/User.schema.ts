import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    toDepend: {
        type: Object,  // ['id', 'name']
        required: true,
    },
    role: {
        ref: "Role",
        type: Object, // {_id, nombre}
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const User = mongoose.model('User', UserSchema);
export default User;