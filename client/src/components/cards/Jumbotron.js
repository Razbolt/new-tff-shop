export default function Jumbotron({title,subtitle}) 
{
    return (
    <div className="container-fluid jumbotron">
       <div className="row">

        <div className="col text-center p-4 ">
            <h1 className="fw-bold">
                {title}
            </h1>
            <p className="lead"> {subtitle}</p>

        </div>

 {/* try also  1*/}
       </div>

    </div>);
}