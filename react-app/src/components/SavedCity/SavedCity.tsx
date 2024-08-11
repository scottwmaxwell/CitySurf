import "./SavedCity.css";
import image from '../../assets/citycard.png';

function SavedCity({city}: any){

    const handleRemove = (e: any)=>{
        let result = window.confirm("Are you sure you want to remove this city?");
        if(result){
            //TODO call API to remove this city and update UI to remove the city
        }
    }

    const handleView = (e: any)=>{

    }

    return(
        <div>
            <div className="card mb-3 bg-dark" >
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{city.name} {city.state}</h5>
                            <p className="card-text">{city.description}</p>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-custom" onClick={handleView}>View</button>
                                <button className="btn btn-outline-custom" onClick={handleRemove}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedCity;