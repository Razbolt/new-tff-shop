import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRouter from "./routes/products.js";
import cors from "cors";

 // try2

//import router from "./routes/auth.js";

dotenv.config()

const app = express();

//console.log('process =>',process);


//db

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected")).catch((err) => console.log('DB ERROR =>', err));

//middleware

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// router middleware

app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRouter);






let port = process.env.PORT;
if (port == null || port == "") {
port = 3000;
}
app.listen(port);



app.listen(3000, function () {
 console.log("server on 3000");
});
//.env.gitignore


