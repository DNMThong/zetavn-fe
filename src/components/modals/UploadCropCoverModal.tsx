import { setUser } from "@/redux/features/auth/auth.slice";
import {
   useUpdateUserImageMutation,
   useUploadImageMutation,
} from "@/redux/features/user/user.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fileImageToUrl } from "@/utils/file.util";
import { setSessionData } from "@/utils/session.util";
import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-easy-crop";
import { FiX } from "react-icons/fi";

interface UploadCropCoverModalProps {
   show: boolean;
   handleCloseModal: () => void;
   type: string;
}
const UploadCropCoverModal = ({
   show,
   handleCloseModal,
   type,
}: UploadCropCoverModalProps) => {
   const source = useAppSelector((selector) => selector.auth.user);
   const dispatch = useAppDispatch();
   const [fileSelected, setFileSelected] = useState<File>();
   const [previewImage, setPreviewImage] = useState<string | undefined>();
   const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
   const [updateUserImage] = useUpdateUserImageMutation();
   const [uploadImage] = useUploadImageMutation();

   const handleUploadFile = async (e: any) => {
      const file: File | null = e.target.files[0]; // Lấy tệp hình ảnh từ trường input
      try {
         if (file) {
            const fileImagePromise: string = await fileImageToUrl(file);
            const fileImage = await Promise.resolve(fileImagePromise);
            setPreviewImage(fileImage);
            setIsFilePicked(true);
            setFileSelected(file);
            // const reader = new FileReader();
            // setFileSelected(file); // Đặt hình ảnh đã đọc vào state
            // setPreviewImage(e?.target?.result as string);
            // reader.onload = (e) => {
            // };
            // reader.readAsDataURL(file); // Đọc tệp hình ảnh dưới dạng Data URL
            // setIsFilePicked(true);
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleSubmitImage = async (e: any) => {
      e.preventDefault();
      if (fileSelected && isFilePicked) {
         const { code, data } = await uploadImage({
            images: [previewImage as string],
         }).unwrap();
         console.log(
            "🚀 ~ file: UploadCropCoverModal.tsx:59 ~ handleSubmitImage ~ previewImage:",
            previewImage
         );
         if (code === 201) {
            const { url } = data;
            const response = await updateUserImage({
               userId: source?.id as string,
               urlBase64: url,
               type,
            }).unwrap();
            console.log(
               "🚀 ~ file: UploadCropCoverModal.tsx:64 ~ handleSubmitImage ~ response:",
               response
            );
            const { code: updateImageCode, data: newUserProfile }: any =
               response;
            if (updateImageCode === 200) {
               setSessionData("userLogin", newUserProfile);
               dispatch(setUser(newUserProfile));
            }
         }
      }
   };

   const handleResetImage = (e: any) => {
      e.preventDefault();
      setFileSelected(undefined);
      setIsFilePicked(false);
      setPreviewImage(source?.avatar as string);
   };
   const component = (
      // <!-- Cover image crop modal -->
      // <!--html/partials/pages/profile/timeline/modals/upload-crop-cover-modal.html-->
      <div
         id="upload-crop-cover-modal"
         className={`modal upload-crop-cover-modal is-large has-light-bg ${
            show ? "is-active" : ""
         }`}
      >
         <div className="modal-background"></div>
         <div className="modal-content">
            <div className="card">
               <div className="card-heading">
                  <h3>Tải ảnh lên</h3>
                  {/* <!-- Close X button --> */}
                  <div className="close-wrap" onClick={handleCloseModal}>
                     <span className="close-modal">
                        <FiX></FiX>
                     </span>
                  </div>
               </div>
               <div className="card-body">
                  <label
                     className={`cover-uploader-box ${
                        isFilePicked ? "is-hidden" : ""
                     }`}
                     htmlFor="upload-cover-picture"
                  >
                     <span className="inner-content">
                        {isFilePicked ? (
                           <img src={previewImage as string} alt="" />
                        ) : (
                           <img
                              src="/img/illustrations/profile/add-cover.svg"
                              alt=""
                           />
                        )}

                        <span>
                           Nhấn vào đây <br />
                           Để tải ảnh
                        </span>
                     </span>
                     <input
                        type="file"
                        id="upload-cover-picture"
                        accept="image/*"
                        onChange={handleUploadFile}
                     />
                  </label>
                  <div
                     className={`upload-demo-wrap ${
                        isFilePicked ? "" : "is-hidden"
                     }`}
                  >
                     <div id="upload-profile" className="croppie-container">
                        <div
                           className="cr-boundary"
                           style={{ width: "100%", height: "300px" }}
                        >
                           <img
                              src={previewImage}
                              alt=""
                              className="cr-image"
                              style={{
                                 display: "block",
                                 margin: "0 auto",
                                 height: "100%",
                                 objectFit: "contain",
                                 objectPosition: "center",
                              }}
                           />
                           {/* <div
                              className="cr-viewport cr-vp-circle"
                              style={{ width: "130px", height: "130px" }}
                           ></div> */}
                           <div className="cr-overlay"></div>
                        </div>
                     </div>

                     <div className="upload-help" style={{ marginTop: "20px" }}>
                        <a
                           id="cover-upload-reset"
                           className="cover-reset"
                           onClick={handleResetImage}
                        >
                           Reset Picture
                        </a>
                     </div>
                  </div>
               </div>
               <div className="card-footer">
                  <button
                     id="submit-cover-picture"
                     className={`button is-solid accent-button is-fullwidth raised ${
                        fileSelected ? "" : "is-disabled"
                     }`}
                     onClick={handleSubmitImage}
                  >
                     Use Picture
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
   return createPortal(
      component,
      document.getElementById(
         "upload-crop-cover-modal-container"
      ) as HTMLElement
   );
};

export default UploadCropCoverModal;
