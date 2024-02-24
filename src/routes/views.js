import { Router } from "express";
import { ProductManager } from "../daos/fileSystem/productManager.js";

const routerViews = Router();
const productsManager = new ProductManager();

routerViews.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        // console.log(products);
        res.render('index', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

export default routerViews;