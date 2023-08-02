import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'constituency_admin', 'normal_user'],
        required: true
    },
    constituency: {
        type: String,
        enum: ['Ashti', 'Karanja', 'Arvi'],
        default: null,
    },
    token: {
        type: String,
    },
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User

