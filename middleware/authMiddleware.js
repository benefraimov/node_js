import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const JWT_SECRET_PASSWORD = "djsabndjkbsab@!#!@#@!"
const protect = async (req, res, next) => {
    let token;
    
    // console.log("1: febore if: ", req.headers)
    // console.log("2: febore if: ", req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {        // לקבל את הטוקן
            token = req.headers.authorization.split(' ')[1]
            // console.log("1: token: ", token)
            const decoded = jwt.verify(token, JWT_SECRET_PASSWORD)
            // console.log("2: decoded: ", decoded)
            
            req.user = await User.findById(decoded.id).select("-password")
            // console.log("3: req.user: ", req.user)

            if (!req.user) {
                return res.status(401).json({ message: "משתמש לא נמצא או טוקן פג תוקף" })
            }

            next()
        } catch (err) {
            console.error("שגיאה באימות הטוקן: " + err.message)
            res.status(401).json({ message: "טוקן אינו מאומת או פג תוקף" })
        }
    }

    if (!token) {
        res.status(401).json({ message: "אין טוקן, אין גישה" })
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({ message: "לא מורשה - אינך אדמין" })
    }
}

export {
    protect,
    admin
}