import User from "../model/user.model.js";
import HttpError from "../middleware/HttpError.js";

const register = async (req, res,next) => {
    try {
        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Role Validation
        const roles = [
            "Admin",
            "Asset Manager",
            "Department Head",
            "Employee",
        ];

        if (!roles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Password Validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Create User
        const user = new User({
            name,
            email,
            password,
            role,
        });

        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);

        if (!user) {
            return next(new HttpError("unable to login", 400));
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ success: true, message: "successfully login!!", user, token });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const authLogin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new HttpError("user not found", 404));
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const logOut = async (req, res, next) => {
    try {
        const user = req.user;

        user.tokens = user.tokens.filter((t) => {
            return t.token != req.token;
        });
        await user.save();
        res.status(200).json({ success: true, message: "user logout successfully!!" });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const logOutAll = async (req, res, next) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({ success: true, message: "user logout all device successfully!" });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
export default {register,login,authLogin,logOut,logOutAll};