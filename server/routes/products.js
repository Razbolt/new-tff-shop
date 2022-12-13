import express  from "express";
import formidable from "express-formidable"; // for taking form data in postman
const router = express.Router()

//middleware
import { requireSignin, isAdmin} from "../middlewares/auth.js";

//controller
import {create,list,read,photo,remove,update,filteredProducts} from "../controllers/products.js";


router.post('/product',requireSignin,isAdmin,formidable(),create);

router.get("/products", list);
router.get("/product/:slug",read);                                             // /:productId kısmı nasıl calısıyor ?
router.get("/product/photo/:productId",photo);
router.delete("/product/:productId",requireSignin,isAdmin,remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);

//try also 2

//CRUD operation


export default router;