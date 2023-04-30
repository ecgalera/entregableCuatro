import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import realTimeProductsRouter from "./router/api.realtimeProducts.router.js"
import viewsRouter from "./router/views.router.js"


const app = express();
const PORT =  8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public/`));

app.use((req, res, next)=>{
    // con esto referenciamos nuestro io
    req.io = io;
    next()
})

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


//views router-----------------------------------------------------


app.use("/realtimeproducts", viewsRouter );
app.use("/api/realtimeproducts", realTimeProductsRouter )
app.use("/api/realtimeproducts/:id", realTimeProductsRouter )
//----------------------------------------------------

const server = app.listen(`${PORT}`, ()=>{
    console.log(`"Listening on:"${PORT}`)
});
const io = new Server(server)

io.on("connection", socket=>{
    console.log("Socket conectado")
})

