import "./Modal.css"

function modal({setModalOpen}: any){

    const handleClose = ()=>{
        setModalOpen(false);
    }

    return(
        <div className="modal-container">
            <div className="modal modal-lg show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={handleClose}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body content</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default modal;