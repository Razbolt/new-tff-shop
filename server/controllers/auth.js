import User from "../models/user.js";
import { hashPassword,comparePassword } from "../helper/auth.js";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// trying

/**
 * this function register the user with asynchronize function that takes request and respond as input 
 * @param {req} request - takes the request from the input in typed as input
 * @param {res} response - shoe the response from that taken input in request
 * After taking request as input , use desctuctor to take input in request body and asign them corresponding values
 * Second line check that if they are empty or not before we acces to database,
 * After this step hash the password  and register to use with .save() function
 * and then send response as json file
 * @returns User registiration
 */

export const register = async (req,res) =>
{
    try
    {
        //1.destructure name, email, password from req.body
        const {name,email,password} = req.body;

        //2. all fields require validation
        if(!name.trim()) 
        {
            return res.json({error:"Name is required"});
        }
        
        if(!email) 
        {
            return res.json({error:"Email is taken"});
        }

        if(!password || password.length < 6 ) 
        {
            return res.json({error:"Password must be at least 6 character long"});
        }

        //3. check if email is taken
        const existingUser = await User.findOne({email:email});

        if(existingUser) 
        {
            return res.json({error:"Email is already taken"});
        }
        //4. hash the password

        const hashedPassword = await  hashPassword(password);

        //5.reqister user
        const user = await new User({name,email,password:hashedPassword}).save();

        //6.create signed jwt
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        //7.send response  
        
        res.json(
            {
                user:
                {
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    addres:user.address,
                },

                token,
            });

       
    }
    catch(err) 
    {
        console.log(err);
    }
};




export const login = async (req,res) =>
{
    try
    {
        //1.destructure name, email, password from req.body
        const {email,password} = req.body;

        //2. all fields require validation
        
        
        if(!email) 
        {
            return res.json({error:"Email is taken"});
        }

        if(!password || password.length < 6 ) 
        {
            return res.json({error:"Password must be at least 6 character long"});
        }

        //3. check if email is taken
        const user = await User.findOne({email:email});

        if(!user) 
        {
            return res.json({error:"User not found"});
        }
        //4. Compare the password 

        const match = await  comparePassword(password,user.password);

        if(!match) 
        {
            return res.json({error:"Wrong password"});
        }

        //5.create signed jwt
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        //6.send response  
        
        res.json(
            {
                user:
                {
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    addres:user.address,
                },

                token,
            });

       
    }
    catch(err) 
    {
        console.log(err);
    }
};

export const secret = async(req,res) => 
{
    res.json({currentUser:req.user});
}