// crear servidor express
import express from "express";
//Multer middleware express
import multer from "multer";
//Handlebars
import exphbs from "express-handlebars";
//socket
import { Server } from "socket.io"
//Import router
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViews from "./routes/views.js";

//designamos el puerto
const PORT = 8080;

// creando una nueva instancia de la aplicación Express
const app = express();

//Este middleware cuando una solicitud llega al servidor con un cuerpo en formato JSON. 
app.use(express.json());

//este middleware lo analiza y lo convierte en un objeto JavaScript 
app.use(express.urlencoded({ extended: true }));

//config handlebars: express busca archivos .handelbars y lo renderize
//le decimos a express que use el motor de plantilla:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//carpeta static Public
app.use(express.static('./src/public'));

//routes
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerViews);

//indicar al servidor que comience a escuchar las solicitudes
const httpServer = app.listen(PORT, () => {
    console.log(`escuchando al puerto ${PORT}`);
});

//socket configuracion
const io = new Server(httpServer);

//conecta con socket.io en fileSystem
import { ProductManager } from "./daos/fileSystem/productManager.js";
const productsManager = new ProductManager();

io.on('connection', (socket) => {
    console.log(`Usuario Conectado ${socket.id}`);
    socket.on('disconnect', () => console.log(`Usuario desconectado ${socket.id}`));

    socket.on('newProducts', async (product) => {
        await productsManager.addProduct(product);
        console.log("Producto agregado:", product);
        const updatedProducts = await productsManager.getProducts();
        // console.log("Productos actualizados:", updatedProducts);
        io.emit('arrayProducts', updatedProducts);
    });

    socket.on('deleteProduct', async (productId) => {
        await productsManager.deleteProduct(productId);
        const updatedProducts = await productsManager.getProducts();
        // console.log("Productos actualizados:", updatedProducts);
        io.emit('arrayProducts', updatedProducts);
    });
});



//aplicando multer
//generea y configuracion de formato y nombre original
//callback 2 prop. destination y filename
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./src/public/img");
//         //donde se guarda las imagenes
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//         //mantengo el nombre original
//     }
// });

//cargar imagen usando multer.
// const upLoad = multer({ storage: storage });
// app.post("/upload", upLoad.single("image"), (req, res) => {
//     res.send("image load")
// });








