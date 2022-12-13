import moment from "moment";
import { Badge } from "antd";

export default function ProductCard( {p} ) 
{
    return(
        <div className = "card mb-3 hoverable" >
        <Badge.Ribbon text = {`${p?.sold} sold`} color ="red">

             <Badge.Ribbon text = { `${p?.quantitiy >= 1 ? `${p?.quantitiy - p?.sold} in stock`  : "Out of Stock"}`} placement = "start" color = "green"> 
             <img  className="card-img-top" src= { ` ${process.env.REACT_APP_API}/product/photo/${p._id}`} alt = {p.name} style = { {height: '250px',objectFit: 'cover' }}/>
        

                <div className=" card-body">

                    <h5>{p?.name}</h5>

                    <h4 className="fw-bold"> {p?.price?.toLocaleString("en-US",{style: 'currency', currency:"USD"})}</h4>

                    <p className="card-text">{p?.description?.substring(0,60)}</p>
            
                </div>

             </Badge.Ribbon>
        </Badge.Ribbon>


        <div className="d-flex justify-content-between">
            <button className=" btn btn-primary col card-button" style={{borderBottomLeftRadius: "5px"} }>
                View Product
            </button>

            <button className=" btn btn-outline-primary col card-button" style={{borderBottomRightRadius: "5px"} }>
                Add to Card
            </button>
        </div>

        {/*<p>{moment(p.createdAt).fromNow()}</p>
        <p>{p.sold} sold</p> */}
        </div> 

    );


}