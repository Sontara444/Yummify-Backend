import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import userAuth from "../middlewares/userAuth.js";

const cartRouter = express.Router()

cartRouter.post('/add', userAuth, addToCart);
cartRouter.post('/remove',userAuth, removeFromCart);
cartRouter.get('/get', userAuth, getCart);

export default cartRouter