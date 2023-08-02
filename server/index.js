import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDB from "./mongodb/connect.js";
import userRoutes from './routes/users.js'
import auth from './middleware/auth.js'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 5000;
app.use('/users', userRoutes);

app.get('/', async (req, res) => {
    res.send('The hamster has started running 🐹')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:5000`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();