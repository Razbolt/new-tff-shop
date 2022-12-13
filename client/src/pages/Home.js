import { useContext } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useEffect,useState } from "react";
import moment from "moment";
import ProductCard from "../components/cards/ProductsCard";



export default function Home() {
  const [products,setProducts] = useState([]);

  useEffect( () => 
  {

    loadProducts();
  })


  const loadProducts = async () => 
  {
      try
      {
          const {data} = await axios.get('/products');
          setProducts(data);

      }
      catch(e)
      {
          console.log(e);
      }
  };

  const arr = [...products];

  const sortedBySold = arr?.sort((a,b) => (a.sold < b.sold ? 1 : -1));
 
    return (
     <div>
        <Jumbotron title = "Federation Shopping  " subtitle ="Welcome to  TFF shopping page " />

        <div className="row">
          <div className=" col-md-6">

          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center ">New Arrivals</h2>

          <div className="row">

          {products?.map ( (p) => 
          (
            <div className=" col-md-6" key={p._id}>
              <ProductCard p = {p}/>
            </div>
            
          ))}

          </div>

        </div>


          <div className=" col-md-6">

          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center ">Top Sellers</h2>
            <div className="row">

              {sortedBySold?.map ( (p) => 
              (
                <div className=" col-md-6" key={p._id}>
                <ProductCard p = {p}/>
                </div>
  
              ))}

            </div>
            
          </div>
        </div>





       
     </div>
    );
  }
  