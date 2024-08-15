import { User } from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, msg: "all fields are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, msg: "Invalid email" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, msg: "Password must be at least 6 characters" })
        }

        const exsistingUserByEmail = await User.findOne({ email: email })

        if (exsistingUserByEmail) {
            return res.status(400).json({ success: false, msg: "Email already in use" })
        }

        const exsistingUserByUsername = await User.findOne({ username: username })

        if (exsistingUserByUsername) {
            return res.status(400).json({ success: false, msg: "Username already in use" })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        


        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });
        // postman

        await newUser.save();
//remove password from response 
        res.status(201).json({
            success: true, user: {
                ...newUser._doc,
                password:""
            }
        });

    } catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export async function login(req, res) {
    res.send("Login route");
}

export async function logout(req, res) {
    res.send("Logout route");
}

