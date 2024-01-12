import dotenv from 'dotenv';
import "express-async-errors";
import express from 'express'
import urlRoutes from './routes/shorturl.routes.js';
import staticRoute from './routes/staticRouter.routes.js'
import { connectDB } from './db/connect.db.js';
import { errorHandler } from './middlewares/errorhandler.middleware.js';
import { fileURLToPath } from 'url';
const app = express();
import path from 'path';


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

// routes
app.use('/', staticRoute);
app.use('/url', urlRoutes);

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
