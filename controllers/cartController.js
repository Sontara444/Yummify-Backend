import userModel from "../Models/userModels.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById({ _id: userId });
    let cartData = userData.cartData;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Added To Cart"});
  } catch (error) {
     return res.json({ success: false, message: error.message});
  }
};

export const removeFromCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;

      let userData = await userModel.findById({ _id: userId });
      let cartData = userData.cartData;

      if(cartData[itemId] > 0){
        cartData[itemId] -= 1;
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      return res.json({success: true, message: "Remove From Cart"});


    } catch (error) {
        return res.json({ success: false, message: error.message});
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await userModel.findById({_id: userId})
        let cartData = userData.cartData
        res.json({success: true, cartData});

    } catch (error) {
        return res.json({ success: false, message: error.message});
    }
};
