import express from "express";
import { addProduct, getProduct, removeProduct } from "../controllers/productController.js";
import upload from "../middlewares/uploadMiddleware.js";

const productRouter = express.Router();

productRouter.post('/add-product', upload.single('image'), addProduct)
productRouter.delete('/remove-product/:id', removeProduct)
productRouter.get('/get-product', getProduct)


export default productRouter;