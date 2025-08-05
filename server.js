import express from 'express';
// שלב ראשון לייבא את הספרייה
import dotenv from 'dotenv';
dotenv.config();
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import itemsRouter from './routes/itemRoutes.js';
import usersRouter from './routes/userRoutes.js';
import cors from "cors"

const app = express();
const port = process.env.PORT || 5002;

connectDB();

// זו ההגדרה
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,//מילישניות
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "יותר מדי בקשות מהכתובת הזו, נא נסו שנית בעוד כ - 2 דקות"
});

// זו ההפעלה של ההגדרה
app.use(globalLimiter)
app.use(cors({origin: "https://react-js-owr0.onrender.com"}))

// middleware to parse JSON body
app.use(express.json())
// api/items
app.use('/api/items', itemsRouter);// crud - get, post, put, delete
app.use('/api/users', usersRouter);// crud - get, post, put, delete
// http://localhost:5002/api/items

// API
// restAPI
// CRUD - CREATE, READ, UPDATE, DELETE
// Json - Data Transfer - המידע עובר ב json בצורה מהירה
// C - POST
// R - GET
// U - PUT/PATCH
// D - DELETE
// שלב שני לפנות למשתנה הסביבה הרצוי
if (process.env.NODE_ENV === "production") {
    console.log(process.env.URL_ADDRESSES)
} else {
    console.log(process.env.URL_ADDRESSES_DEV)
}
app.get('/test', (req, res) => {
    // res.send("This is a test!")
    res.json("This is a test!")
})

app.use('/', (req, res) => {
    res.send("Hellooo!")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})