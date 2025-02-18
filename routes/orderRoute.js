import express from "express";
import { placeOrder, usersOrders, verifyOrder } from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders',userAuth, usersOrders);

export default orderRouter;