import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import productsManager from './managers/ProductsManager.js';

const app = express();
const PORT = process.env.PORT||8080;
const ProductsManager = new productsManager();

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const socketServer = new Server(server);

app.use(`/`,viewsRouter);

socketServer.on("connection",async(socketClient)=>{
    console.log(`cliente ${socketClient.id} conectado.`)
    socketClient.on("newProduct",async data=>{
        const newProduct = {
            title:data.title,
            description:data.description,
            price:data.price,
            stock:data.stock||1
        }
        try{
            await ProductsManager.addProducts(newProduct);
            console.log(newProduct);
        }catch(error){
            console.log(error);
        }
        socketServer.emit("log");
    })

    socketClient.on("delete",async data=>{
        try{
            await ProductsManager.deleteProducts(data);
        }catch(error){
            console.log(error);
        }
        socketServer.emit("log");
    })
})