import React from "react";
import StoneDetailsForm from "./StoneDetailsForm";

const StoneDetailsModal = ({ showModal, handleCloseModal }) => {
  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="stockentrymodalformcontainer">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h5 className="modal-title">Stone Details</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <StoneDetailsForm />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoneDetailsModal;
