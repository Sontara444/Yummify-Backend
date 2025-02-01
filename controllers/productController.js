import productModel from "../Models/productModel.js";

export const addProduct = async (req, res) => {
  const { name, description, image, category, price } = req.body;

  if (!name || !description || !image || !category || !price) {
    return res.status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const last_product = await productModel.findOne({}).sort({ id: -1 });
    const id = last_product ? last_product.id + 1 : 1;

    const product = new productModel({
      id,
      name,
      description,
      image,
      category,
      price,
    });
    await product.save();
    console.log(product)

    return res
      .status(201)
      .json({ success: true, name, message: "New product added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findOneAndDelete({ id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product with ID ${id} has been removed`,
    });
  } catch (error) {
     return res.status(500).json({ success: false, message: error.message });
  }
};
