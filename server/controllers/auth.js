import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({ message: "User already exist" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash
        });

        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.JWT_SCRT,
            { expiresIn: "30d" }
        );

        await newUser.save();

        res.json({ newUser, token, message: "User was created" });
    } catch (error) {
        res.json({ message: error });
    }
};

//Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({
                message: "Password not correct"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SCRT,
            { expiresIn: "30d" }
        );
        res.json({
            token,
            user,
            message: "Congrats"
        });
    } catch (error) {
        res.json({ message: error });
    }
};

// Getting profile
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: "User shnot found"
            });
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SCRT,
            { expiresIn: "30d" }
        );
        res.json({
            user,
            token,
            message: "You are good"
        });
    } catch (error) {
        res.json({ message: "no assess" });
    }
};
