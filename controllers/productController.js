import productModel from "../Models/productModel.js";


export const addProduct = async (req, res) => {

  const { name, description, category, price ,available } = req.body;

  const image = req.file? req.file.path : null;

  if (!name || !description || !image || !category || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const last_product = await productModel.findOne({}).sort({ id: -1 });
    const id = last_product ? last_product.id + 1 : 1;

    const newProduct = new productModel({
      id,
      name,
      description,
      image,
      category,
      price,
      available,
    });
    await newProduct.save();
    console.log(newProduct);

    return res
      .status(201)
      .json({ success: true, name, message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findOneAndDelete({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product removed`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getProduct = async (req, res) =>{
  try {
    const products = await productModel.find({})
    

    return res.status(200).json({ success: true, message: "All Products", products });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
