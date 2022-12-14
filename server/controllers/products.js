import Product from "../models/products.js";
import fs from "fs";
import slugify from "slugify";
import products from "../models/products.js";


export const create = async (req,res) => 
{
    try 
    {   
        /*console.log(req.fields);
        console.log(req.files); */


        //destructor
        const {name, description, price,category, quantitiy, shipping}  =req.fields;

        const {photo} = req.files;


        //validation
        switch(true)
        {
            case !name.trim():
                return res.json({error:"Name is required"});

            case !description.trim():
                return res.json({error:"Description is required"});

            case !price.trim():
                return res.json({error:"Price  is required"});
    
            case !category.trim():
                 return res.json({error:"Category is required"});
                
                
            case !quantitiy.trim():
                return res.json({error:"Quantity  is required"});
    
            case !shipping.trim():
                return res.json({error:"Shipping is required"});

            case photo && photo.size >10000000000: // 1mb dan büyük burası 
                return res.json({error:"Image should be less than 1mb in size"});
  
        }


        //create product
        const product = new Product({...req.fields, slug:slugify(name) });



        if(photo) 
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save()
        res.json(product);


    }
    catch(err) 
    {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const list = async(req,res) => 
{
    try
    {
        const products = await Product.find({}).populate("category").select("-photo").limit(12).sort({ createdAt:-1 });
        res.json(products);


       

    }
    catch(err) 
    {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

/** This function read the products from the databases
 * @param {req} request - request from the inputs that slug of the products 
 * @param {res} response - response that taken from request 
 * @returns  {product} return the products that founded that asked from the request parameters in slug withtout taken photos and populate category
 *  
 * */

export const read = async(req,res) => 
{
    try 
    {
            const product = await Product.findOne({slug:req.params.slug}).select("-photo").populate("category");

            res.json(product);

    }
    catch(err)
    {
        console.log(err);
    }
};


export const photo = async(req,res)  => 
{
    try 
    {
        const product = await Product.findById(req.params.productId).select("photo");

        if(product.photo.data)
        {
            res.set('Content-Type',product.photo.contentType);

            return res.send(product.photo.data);
        }
    }
    catch(err)
    {
        console.log(err);
    }
};


export const remove = async(req,res) => 
{
    try 
    {
        const product = await Product.findByIdAndDelete(req.params.productId).select('-photo');

        res.json(product);
    }
    catch(err)
    {
        console.log(err);
    }
};



export const update = async (req,res) => 
{
    try 
    {   
        /*console.log(req.fields);
        console.log(req.files); */


        //destructor
        const {name, description, price,category, quantitiy, shipping}  =req.fields;

        const {photo} = req.files;


        //validation
        switch(true)
        {
            case !name.trim():
                res.json({error:"Name is required"});

            case !description.trim():
                res.json({error:"Description is required"});

            case !price.trim():
                res.json({error:"Price  is required"});
    
            case !category.trim():
                res.json({error:"Category is required"});
                
                
            case !quantitiy.trim():
                res.json({error:"Quantity  is required"});
    
            case !shipping.trim():
                res.json({error:"Shipping is required"});

            case photo && photo.size >10000000000: // 1mb dan büyük burası 
                res.json({error:"Image should be less than 1mb in size"});
  
        }


        //update product
        const product = await Product.findByIdAndUpdate(req.params.productId, {...req.fields, slug: slugify(name), }, {rew: true} );



        if(photo) 
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save()
        res.json(product);


    }
    catch(err) 
    {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const filteredProducts = async (req, res) => {
    try {
      const { checked, radio } = req.body;
  
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      console.log("args => ", args);
  
      const products = await Product.find(args);
      console.log("filtered products query => ", products.length);
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  };


  export const productsCount = async (req,res) => 
  {
    try 
    {
        const total = await Product.find({}).estimatedDocumentCount();
        res.json(total);

    }
    catch(err) 
    {
        console.log(err);
    }
  };

  export const listProducts = async (req,res) => 
  {
    try 
    {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;

        const products =  await Product.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt:-1});
        
        res.json(products);

    }
    catch(err) 
    {
        console.log(err);
    }
  };


  export const productsSearch = async(req,res) => 
  {
    try 
    {
        const {keyword} = req.params;
        const results = await Product.find({
            $or: [
                {name:{$regex: keyword, $options: "i"}},
                {description:{$regex: keyword, $options: "i"}},
        
                ],
        }).select('-photo');
        res.json(results);
     }
    catch(err)
    
    {
        console.log(err);
    }
  }

  export const relatedProducts = async(req,res) => 
  {
    try 
    {
        const {productId,categoryId} = req.params;
        const related = await Product.find(
            {
                category:categoryId,
                _id:{$ne:productId},
            }).select('-photo').populate('category').limit(3);

            res.json(related)
    }
    catch(err) 
    {
        console.log(err);
    }
  }
