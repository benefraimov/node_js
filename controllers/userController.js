import User from "../models/user.js";
import jwt from "jsonwebtoken"

// User
const JWT_SECRET_PASSWORD = "djsabndjkbsab@!#!@#@!"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_PASSWORD || JWT_SECRET_PASSWORD, {
        expiresIn: '5m'
    })
}

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    // אימות בסיסי - בדיקה שהמשתמש מילה את כל השדות
    if (!username || !email || !password) {
        return res.status(400).json({ message: "אנא מלא את כל השדות" })
    }

    const userExist = await User.findOne({ $or: [{ email: email }, { username: username }] })
    if (userExist) {
        return res.status(400).json({ message: "משתמש עם אימייל או שם משתמש כזה כבר קיים" })
    }
    try {
        const user = await User.create({ username, email, password })

        if (user) {
            const { _id, username, email, isAdmin } = user
            res.status(201).json({
                _id: _id,
                username: username,
                email: email,
                isAdmin: isAdmin,
                token: generateToken(_id)
            })
        } else {
            res.status(400).json({ message: "פרטי משתמש לא תקינים" })
        }
    } catch (err) {
        res.status(500).json({ message: "שגיאת שרת: " + err.message })
    }
}

// @desc    Authenticate user & get token       
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "אנא הזן אימייל וגם סיסמא" })
    }

    try {
        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            const { _id, username, email, isAdmin } = user
            res.json({
                _id: _id,
                username: username,
                email: email,
                isAdmin: isAdmin,
                token: generateToken(_id)
            })
        } else {
            res.status(401).json({ message: "אימייל או סיסמא שגויים" })
        }
    } catch (err) {
        res.status(500).json({ message: "שגיאה בשרת: " + err.message })
    }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    // כעת ניתן לפנות למשתמש בגלל שהוא עבר את שכבת הביניים
    // הוא עם טוקן מאומת

    if (req.user) {
        const { _id, email, username, isAdmin } = req.user
        res.json({
            user: {
                _id: _id,
                email: email,
                username: username,
                isAdmin: isAdmin
            },
            token: generateToken(_id)
        })
    } else {
        res.status(404).json({ message: "משתמש לא נמצא" })
    }
}

export {
    registerUser,
    loginUser,
    getUserProfile
}