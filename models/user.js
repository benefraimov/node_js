import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "user name required"],
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is not Valid"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10); // 2 ** 10 = dasdbb378h#@$#@$#@$$hdvvbsbj
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// יצירת מתודה לבדיקת התאמה של הסיסמאות
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

const User = mongoose.model('User', userSchema)

export default User;

