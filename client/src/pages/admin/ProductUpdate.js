import  {useAuth} from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import { json } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../components/nav/AdminMenu"
import { useState,useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import  toast  from "react-hot-toast";
import { useNavigate,useParams } from "react-router-dom";



const {Option} = Select;


export default function AdminProductUpdate () 
{
    //context
    
    const [auth,setAuth] = useAuth();

    //hook
    const navigate = useNavigate();
    const params = useParams();

    

    //state 

    const[categories,setCategories]  = useState([]);
    const[photo,setPhoto] = useState("");
    const[name,setName] = useState("");
    const[category,setCategory] = useState("");
    const[description,setDescription] = useState("");
    const[price,setPrice] = useState("");
    const[shipping,setShipping] = useState("");
    const[quantitiy,setQuantity] = useState("");
    const[id,setId] = useState("");


    useEffect(() => 
    {
        loadCategories();
    },[]);


    useEffect(() => 
    {
        loadProducts();
    },[]);


    const loadCategories = async () => 
    {
        try 
        {
            const {data} = await axios.get("/categories"); // await önemliiii !!! 
            //console.log(data);
            setCategories(data);
        }
        catch(err)
        {
            console.log(err);
        }
    };


    const loadProducts = async ()  =>
    {
        try 
        {
            const{data}  = await axios.get(`/product/${params.slug}`);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category._id);
            setShipping(data.shipping);
            setQuantity(data.quantitiy);
            setId(data._id)

            //console.log('params =>',data);
            
        }
        catch(err)
        {
            console.log(err);
        }
    };
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {        //console.log(name,description,price,shipping,quantitiy,category,photo);

            const productData =  new FormData();

            photo && productData.append('photo',photo);
            productData.append('name',name);
            productData.append('description',description);
            productData.append('price',price);
            productData.append('category',category);
            productData.append('shipping',shipping);
            productData.append('quantitiy',quantitiy);


            //console.log([...productData]);
            const {data} = await axios.put(`/product/${id}`,productData);

            if(data?.error)
            {
                toast.error(data.error);
            }
            else 
            {
                toast.success(`${data.name} is updated `);

                navigate("/dashboard/admin/products");
                window.location.reload();

            }
          
        }
        catch(err)
        {
            console.log(err);
            toast.error('Product create failed, Try again');
        }
    };

    const handleDelete = async (req,res) => 
    {

        try
        {   let answer = window.confirm("Are you sure you want to delete this products ?");
            if(!answer) return;
            const {data} =  await axios.delete(`/product/${id}`);
            toast.success(` "${data.name}" is deleted !`);
            navigate('/dashboard/admin/products');
        }
        catch(err)
        {
            console.log(err);
            toast.error('Delete failed, try again');
        }
    };



    return( 
    <>
        <Jumbotron 
            title={`Hello ${auth?.user?.name}`}
            subtitle = "Admin Dashboard"
        />
         <div className="container-fluid ">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
            
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light"> Update Product</div>
                    
                    {photo ? (<div className="text-center">
                        <img src = {URL.createObjectURL(photo)} alt = "product photo" className=" img img-responsive" height="200px"/>
                        
                              </div>):

                        <div className="text-center ">

                        
                        <img src = {`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`} alt = "product photo" className=" img img-responsive" height="200px"/>
                        
                        </div>}

                       <div className="pt-2">
                            
                        <label className="btn btn-outline-secondary  col-12 mb-3">
                            {photo ? photo.name: 'Upload Photo'}

                        <input type ="file"
                            name = "photo"
                            accept="image/*" 

                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden/>
                        </label>

                       </div>

                       <input type="text" className="form-control p-2 mb-3" placeholder="Write a name " value = {name} onChange={e => setName(e.target.value)}/>

                       <textarea type="text" className="form-control p-2 mb-3" placeholder="Write a description " value = {description} onChange={e => setDescription(e.target.value)}/>

                       <input type="number" className="form-control p-2 mb-3" placeholder="Enter Price " value = {price} onChange={e => setPrice(e.target.value)}/>

                       


                   
                    <Select   bordered={false} size= "large" className="form-select mb-3" placeholder="Choose category " onChange={(value) =>setCategory(value)} value = {category}>
                        
                        {categories?.map( (c) =>(<Option key={c._id} value= {c._id}>{c.name}</Option>))}
                    </Select>

                    <Select showSearch  bordered={false} size= "large" className="form-select mb-3" placeholder="Is it shippable ? " onChange={(value) =>setShipping(value)} value={shipping ? "Yes":"No"}>
                        
                        <Option  value= "0">No</Option>
                        <Option  value= "1">Yes</Option>
                    </Select>


                    <input type="number" min= "1" className="form-control p-2 mb-3" placeholder="Enter Quantitiy " value = {quantitiy} onChange={e => setQuantity(e.target.value)}/>
                    <div className=" d-flex justify-content-between ">

                    <button onClick={handleSubmit} className="btn btn-primary mb-3">Update</button>
                    <button onClick={handleDelete} className="btn btn-danger mb-5">Delete</button>

                    </div>



                    
                </div>

            </div>

         </div>
    </>
   
   
    );
}