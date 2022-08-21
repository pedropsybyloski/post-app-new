import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config()
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({ limit:"30mb", extended:true}))
app.use(cors());
app.use('/posts', postRoutes);

app.get('/', (req,res) => { 
    res.send("Projeto PostApp Rodando")
})

const CONNECTION_URL = 'mongodb+srv://<User>:<Password>@cluster0.j32iz.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000; 

mongoose.connect(CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology : true  })
    .then(()=> app.listen(PORT, ()=> console.log(`Server rodando na porta: ${PORT}`)))
    .catch((error)=> console.log(error.message) )

