import React from "react";

interface EducationContentPartProps {
   isActive: boolean;
}

const EducationContentPart = ({ isActive }: EducationContentPartProps) => {
   return (
      <div
         id="education-content"
         className={`content-section ${isActive ? "is-active" : ""}`}
      >
         <div id="education-glider" className="slider-timeline about-glider">
            {/* <!--Timeline Item--> */}
            <div className="timeline-item">
               <div className="image-container">
                  <img
                     src="https://via.placeholder.com/800x600"
                     alt=""
                     data-demo-src="assets/img/demo/unsplash/popovers/pages/brent.jpg"
                  />
                  <div className="logo-container">
                     <img
                        src="https://via.placeholder.com/150x150"
                        alt=""
                        data-demo-src="assets/img/vector/icons/logos/brent.svg"
                        data-page-popover="6"
                     />
                  </div>
               </div>
               <h3>Master Degree</h3>
               <p>Brent University</p>
               <div className="more">
                  <p>
                     Lorem ipsum sit dolor amet is a dummy text used by
                     typographers.
                  </p>
               </div>
               <div className="date">Aug 2016</div>
            </div>
            {/* <!--Timeline Item--> */}
            <div className="timeline-item">
               <div className="image-container">
                  <img
                     src="https://via.placeholder.com/800x600"
                     alt=""
                     data-demo-src="assets/img/demo/unsplash/popovers/pages/drop.jpg"
                  />
                  <div className="logo-container">
                     <img
                        src="https://via.placeholder.com/150x150"
                        alt=""
                        data-demo-src="assets/img/vector/icons/logos/drop.svg"
                        data-page-popover="10"
                     />
                  </div>
               </div>
               <h3>Internship</h3>
               <p>Drop Cosmetics</p>
               <div className="more">
                  <p>
                     Lorem ipsum sit dolor amet is a dummy text used by
                     typographers.
                  </p>
               </div>
               <div className="date">May 2016</div>
            </div>
            {/* <!--Timeline Item--> */}
            <div className="timeline-item">
               <div className="image-container">
                  <img
                     src="https://via.placeholder.com/800x600"
                     alt=""
                     data-demo-src="assets/img/demo/unsplash/popovers/pages/quick-fashion.jpg"
                  />
                  <div className="logo-container">
                     <img
                        src="https://via.placeholder.com/150x150"
                        alt=""
                        data-demo-src="assets/img/vector/icons/logos/quick-fashion.svg"
                        data-page-popover="11"
                     />
                  </div>
               </div>
               <h3>Internship</h3>
               <p>Quick Fashion</p>
               <div className="more">
                  <p>
                     Lorem ipsum sit dolor amet is a dummy text used by
                     typographers.
                  </p>
               </div>
               <div className="date">Oct 2015</div>
            </div>
            {/* <!--Timeline Item--> */}
            <div className="timeline-item">
               <div className="image-container">
                  <img
                     src="https://via.placeholder.com/800x600"
                     alt=""
                     data-demo-src="assets/img/demo/unsplash/popovers/pages/brent.jpg"
                  />
                  <div className="logo-container">
                     <img
                        src="https://via.placeholder.com/150x150"
                        alt=""
                        data-demo-src="assets/img/vector/icons/logos/brent.svg"
                        data-page-popover="6"
                     />
                  </div>
               </div>
               <h3>Bachelor Degree</h3>
               <p>Brent University</p>
               <div className="more">
                  <p>
                     Lorem ipsum sit dolor amet is a dummy text used by
                     typographers.
                  </p>
               </div>
               <div className="date">Jul 2015</div>
            </div>
         </div>

         <div id="slider-dots-education-glider" className="dots"></div>
      </div>
   );
};

export default EducationContentPart;
