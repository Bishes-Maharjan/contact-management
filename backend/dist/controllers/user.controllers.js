import { comparePassword } from "../libs/hashing";
import { createToken } from "../libs/jwt";
import { UserModel } from "../models/user.model";
export const registerUser = async (req, res) => {
    try {
        const { name, address, phone, email, favourite, notes, password } = req.body;
        if (!phone && !email) {
            return res.status(401).json({ error: "Phone or Email is required" });
        }
        const user = new UserModel({
            name,
            address,
            phone,
            email,
            favourite,
            notes,
            password,
        });
        await user.save();
        const token = createToken(String(user._id));
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(201).json({ success: true, user });
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Unable to register user" });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { phone, email, password } = req.body;
        if (!phone && !email)
            return res.status(401).json({ error: "Phone or Email is required" });
        const user = await UserModel.findOne({ $or: [{ email }, { phone }] });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ error: "Invalid password" });
        const token = createToken(String(user._id));
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.json({ success: true, user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getMe = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const user = await UserModel.findById(userId);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json({ user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
