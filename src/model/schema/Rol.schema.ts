import mongoose, { Schema } from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    /*
    toDepend: {
        type: Object, // ['id', 'name']
        required: true,
    },
    */
    toBack: [
        {
            ref: 'Access-Page',
            type: Object,
        }
    ],
    toFront: [
        {
            ref: 'Access-Page',
            type: Object,
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
});

const User = mongoose.model('Role', RoleSchema);
export default User;