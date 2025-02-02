import express from "express";
import { addProduct, removeProduct } from "../controllers/productController.js";
import upload from "../middlewares/uploadMiddleware.js";

const productRouter = express.Router();

productRouter.post('/add-product', upload.single('image'), addProduct)
productRouter.delete('/remove-product/:id', removeProduct)


export default productRouter;