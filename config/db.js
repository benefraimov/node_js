import mongoose from "mongoose";
// mongodb+srv://zoomtechcollege:53Feq3xPEVVTuPv@zoomprojects.edknv.mongodb.net/?retryWrites=true&w=majority&appName=ZoomProjects
async function connectDB() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testDB';
    try {
        const response = await mongoose.connect(mongoUri)
        // response.
        console.log('Connected successfuly to MDB Server DB: testDB')
    } catch (error) {
        console.error('שגיאה בהתחברות לmongodb ' + error)
    }
}

export default connectDB;