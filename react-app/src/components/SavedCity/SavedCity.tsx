import "./SavedCity.css";
import image from '../../assets/citycard.png';

function SavedCity({city, id, handleRemove, handleViewClick}: any){
    return(
        <div>
            <div className="card mb-3 bg-dark" >
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{city.name}, {city.state}</h5>
                            <p className="card-text">{city.description}</p>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-custom" id={id} onClick={handleViewClick}>View</button>
                                <button className="btn btn-outline-custom" id={id} onClick={handleRemove}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedCity;