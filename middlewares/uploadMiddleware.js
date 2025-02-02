import multer from "multer";
import cloudinary from '../config/cloudinary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "mern-ecommerce",
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});


const upload = multer({storage: storage})

export default upload;