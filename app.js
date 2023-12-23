import dotenv from 'dotenv';
import "express-async-errors";
import express from 'express'
import urlRoutes from './routes/shorturl.routes.js';
import { connectDB } from './db/connect.db.js';
import { errorHandler } from './middlewares/errorhandler.middleware.js';
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello url shortner");
})

// routes
app.use('/api/v1/urlshortner', urlRoutes);

// middleware
app.use(errorHandler);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}...`);
        })
        
    } catch(err) {
        console.log(err);
    }
}

// start the database.
start();
