import { useEffect } from "react";
import "./Toast.css";

// this component displays in the bottom right (bootstrap component) to 
// communicate actions performed
const Toast = ({ message, title, show, setToastShow }: any) => {
  useEffect(() => {
    if (show) {
      setToastShow(true);
      // Automatically hide the toast after 3 seconds
      const timer = setTimeout(() => {
        setToastShow(false);
      }, 3000);

      // Cleanup timer if component is unmounted or show changes
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        className={show ? "show toast bg-dark" : "toast bg-dark"}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-dark">
          <strong className="me-auto text-light">{title}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body bg-dark text-light">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
