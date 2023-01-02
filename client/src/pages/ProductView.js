import {useState,useEffect} from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Badge } from 'antd';
import moment from 'moment';
import { FaDollarSign,FaProjectDiagram,FaRegClock,FaCheck,FaTimes,FaTruckMoving,FaWarehouse,FaRocket } from "react-icons/fa";

import ProductCard from '../components/cards/ProductsCard';


export default function ProductView() 
{
    const [product,setProduct] = useState({});
    const [related,setRelated] = useState([]);
    //hooks

    const params = useParams();


    useEffect( () =>
    {
         if(params?.slug) loadProduct();
    },[]);

    const loadProduct = async(req,res) => 
    {
        try 
        {
            const {data}  =await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id, data.category._id)
        }
        catch(err) 
        {
            console.log(err);
        }
    };


    const loadRelated = async(productId, categoryId) => 
    {
        try 
        {
            const {data} =  await axios.get(`/related-products/${productId}/${categoryId}`);
            setRelated(data);
        }
        catch(err)
        {
            console.log(err);
        }
    };
    return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-9'>

            <div className = "card mb-3 " >
        <Badge.Ribbon text = {`${product?.sold} sold`} color ="red">

             <Badge.Ribbon text = { `${product?.quantitiy >= 1 ? `${product?.quantitiy - product?.sold} in stock`  : "Out of Stock"}`} placement = "start" color = "green"> 
             <img  className="card-img-top" src= { ` ${process.env.REACT_APP_API}/product/photo/${product._id}`} alt = {product.name} style = { {height: '500px',width: "100%",objectFit: 'cover' }}/>
        

                <div className=" card-body">

                    <h1 className='fw-bold'>{product?.name}</h1>

                    

                    <p className="card-text lead">{product?.description}</p>
            
                </div>
                <div className='d-flex justify-content-between lead p-5 bg-light fw-bold'>
                    <div>
                        <p className="fw-bold"><FaDollarSign/> Price: {product?.price?.toLocaleString("en-US",{style: 'currency', currency:"USD"})} </p>
                        <p><FaProjectDiagram/> Category: {product?.category?.name}</p>
                        <p> <FaRegClock/> Added:{moment(product.createdAt).fromNow()} </p>
                        <p>
                            {product?.quantitiy > 0 ? <FaCheck/> : <FaTimes/>} {" "}
                            {product?.quantitiy > 0 ? "In Stock" : "Out of Stock"} {" "}
                            
                        
                        </p>
                        <p> <FaWarehouse/> Available {product?.quantitiy - product?.sold}</p>
                        <p> <FaRocket/> Sold {product.sold} </p>
                    </div>
                </div>

             </Badge.Ribbon>
        </Badge.Ribbon>


    
            <button className=" btn btn-outline-primary col card-button" style={{borderBottomRightRadius: "5px"} }>
                Add to Card
            </button>
        </div>


            </div>

            <div className='col-md-3'>

                <h2>Related products</h2>

                <hr/>{related?.length < 1 && <p> Nothing Found</p>}
                {related?.map( (p) => (<ProductCard p ={p} key = {p._id} /> ))}

            </div>
        </div>
    </div>


    );
    

}