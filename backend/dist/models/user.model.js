import mongoose, { Schema } from "mongoose";
import { hashPassword } from "../libs/hashing";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;
export const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        sparse: true,
        match: [emailRegex, "Invalid email address"],
    },
    phone: {
        type: String,
        trim: true,
        sparse: true,
        match: [phoneRegex, "Invalid phone number"],
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userSchema.pre("validate", function () {
    if (!this.email && !this.phone) {
        throw new Error("Either email or phone is required");
    }
});
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
});
export const UserModel = mongoose.model("User", userSchema);
