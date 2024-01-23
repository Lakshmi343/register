import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Admin = model("admins", adminSchema);

export default Admin;