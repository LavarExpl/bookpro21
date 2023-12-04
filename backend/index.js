import express from 'express';
import { PORT, mangoDburl } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors'
const app =express();
//middleware for parsing request body
// option1 alloq all origins with defualt of cors
app.use(cors());

app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Welcome to Lavar's Book Database page")
});

app.use('/books',booksRoute);


mongoose
  .connect(mangoDburl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });