import "./Modal.css"
import { useState } from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Metrics from '../Metrics/Metrics';
import Passreset from '../Passreset/Passreset';

function Modal({setModalOpen}: any){

    const [login, setLogin] = useState(true);
    const [passReset, setPassReset] = useState(false);
    const [signup, setSignup] = useState(false);
    const [metrics, setMetrics] = useState(false);

    const handleClose = ()=>{
        setModalOpen(false);
    }

    return(
        <div className="modal-container">
            <div className="modal modal-open show d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close btn-close-white" onClick={handleClose}>
                            </button>
                        </div>
                        <div className="modal-body">
                           {login && <Login setPassReset={setPassReset} setLogin={setLogin} setSignup={setSignup} />}
                           {passReset && <Passreset />}
                           {signup && <Signup setPassReset={setPassReset} setLogin={setLogin} setSignup={setSignup} setMetrics={setMetrics} />}
                           {metrics && <Metrics />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;