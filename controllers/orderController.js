import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:3000"
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, {cartData: {}})

    const line_items = items.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100*80
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:100*80
        },
        quantity:1
    })


    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true, session_url:session.url})

  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message });
  }

};


export const verifyOrder = async(req, res)=>{
  const {orderId, success} = req.body;

  try {
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment:"true"})
      res.json({success: true, message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:true, message:"Not Paid"})
    }
    
  } catch (error) {
    res.json({success:false, message: "Error"})
  }
}

export const usersOrders = async(req, res)=>{
  const {userId} = req.body;
  try {
    const orders = await orderModel.find({userId})
    res.json({success:true, data:orders})
    
  } catch (error) {
    res.json({success:false, message:"Error"})
  }
}

// Listing orders for admin panel
export const listOrders = async(req, res)=>{
  try {
    const orders = await orderModel.find({})
    res.json({success:true, data:orders})
    
  } catch (error) {
    res.json({success:false, message:"Error"})
  }
}


// api  for updating orders status admin panel
export const updateStatus = async(req, res)=>{
  const {orderId, status} = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true, message:"Status Updated"})
    
  } catch (error) {
    res.json({success:false, message:"Error"})
  }

}