import express from "express";
import { listOrders, placeOrder, updateStatus, usersOrders, verifyOrder } from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders',userAuth, usersOrders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;