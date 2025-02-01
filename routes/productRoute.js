import express from "express";
import { addProduct, removeProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/add-product', addProduct)
productRouter.delete('/remove-product/:id', removeProduct)

export default productRouter;