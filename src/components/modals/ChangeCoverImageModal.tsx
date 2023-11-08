import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import UploadCropCoverModal from "./UploadCropCoverModal";

interface ChangeCoverImageModalProps {
   show: boolean;
   handleCloseModal: () => void;
   type: string;
}

const ChangeCoverImageModal = ({
   show,
   handleCloseModal,
   type,
}: ChangeCoverImageModalProps) => {
   const [uploadCropCoverModal, setUploadCropCoverModal] = useState(false);
   const handleCloseUploadCropCoverModal = () => {
      setUploadCropCoverModal(false);
   };

   const component = (
      <div
         id="change-cover-modal"
         className={`modal change-cover-modal is-medium has-light-bg ${
            show ? "is-active" : ""
         }`}
      >
         {uploadCropCoverModal && (
            <UploadCropCoverModal
               show={uploadCropCoverModal}
               handleCloseModal={handleCloseUploadCropCoverModal}
               type={type}
            />
         )}
         <div className="modal-background"></div>
         <div className="modal-content">
            <div className="card">
               <div className="card-heading">
                  <h3>Thay đổi ảnh</h3>
                  {/* <!-- Close X button --> */}
                  <div className="close-wrap" onClick={handleCloseModal}>
                     <span className="close-modal">
                        <FiX></FiX>
                     </span>
                  </div>
               </div>
               <div className="card-body">
                  {/* <!-- Placeholder --> */}
                  <div className="selection-placeholder">
                     <div className="columns">
                        <div className="column is-6">
                           {/* <!-- Selection box --> */}
                           <div
                              className="selection-box modal-trigger"
                              data-modal="upload-crop-cover-modal"
                           >
                              <div
                                 className="box-content"
                                 onClick={() => {
                                    setUploadCropCoverModal(true);
                                 }}
                              >
                                 <img
                                    src="/img/illustrations/profile/upload-cover.svg"
                                    alt=""
                                 />
                                 <div className="box-text">
                                    <span>Tải ảnh lên</span>
                                    <span>Từ thiết bị của bạn</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="column is-6">
                           {/* <!-- Selection box --> */}
                           <div
                              className="selection-box modal-trigger"
                              data-modal="user-photos-modal"
                           >
                              <div className="box-content">
                                 <img
                                    src="/img/illustrations/profile/change-cover.svg"
                                    alt=""
                                 />
                                 <div className="box-text">
                                    <span>Chọn ảnh có sẵn</span>
                                    <span>Từ ảnh của bạn</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
   return createPortal(
      component,
      document.getElementById("edit-cover-modal") as HTMLElement
   );
};

export default ChangeCoverImageModal;
