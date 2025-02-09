import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.post('/place', userAuth, placeOrder)

export default orderRouter;