import express from "express";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/verify', verifyOrder);

export default orderRouter;