import React from "react";

interface JobContentPartProps {
  isActive: boolean;
}

const JobContentPart = ({ isActive }: JobContentPartProps) => {
  const activeClassName = isActive ? "is-active" : "";
  return (
    <div id="job-content" className={"content-section " + activeClassName}>
      {/* <!-- Timeline section --> */}
      <div id="jobs-glider" className="slider-timeline about-glider">
        {/* <!--Timeline Item--> */}
        <div className="timeline-item">
          <div className="image-container">
            <img
              src="https://via.placeholder.com/800x600"
              alt=""
              data-demo-src="assets/img/demo/unsplash/popovers/pages/slicer.jpg"
            />
            <div className="logo-container">
              <img
                src="https://via.placeholder.com/150x150"
                alt=""
                data-demo-src="assets/img/vector/icons/logos/slicer.svg"
                data-page-popover="4"
              />
            </div>
          </div>
          <h3>Artistic Director</h3>
          <p>Slicer</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">Aug 2019</div>
        </div>
        {/* <!--Timeline Item--> */}
        <div className="timeline-item">
          <div className="image-container">
            <img
              src="https://via.placeholder.com/800x600"
              alt=""
              data-demo-src="assets/img/demo/unsplash/popovers/pages/cssninja.png"
            />
            <div className="logo-container">
              <img
                src="https://via.placeholder.com/150x150"
                alt=""
                data-demo-src="assets/img/avatars/hanzo.svg"
                data-page-popover="5"
              />
            </div>
          </div>
          <h3>Artistic Director</h3>
          <p>Css Ninja</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">Jan 2019</div>
        </div>
        {/* <!--Timeline Item--> */}
        <div className="timeline-item">
          <div className="image-container">
            <img
              src="https://via.placeholder.com/800x600"
              alt=""
              data-demo-src="assets/img/demo/unsplash/popovers/pages/lipflow.jpg"
            />
            <div className="logo-container">
              <img
                src="https://via.placeholder.com/150x150"
                alt=""
                data-demo-src="assets/img/vector/icons/logos/lipflow.svg"
                data-page-popover="9"
              />
            </div>
          </div>
          <h3>Head of Sales</h3>
          <p>Lipflow</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">May 2018</div>
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
          <h3>Manager</h3>
          <p>Drop Cosmetics</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">Oct 2018</div>
        </div>
        {/* <!--Timeline Item--> */}
        <div className="timeline-item">
          <div className="image-container">
            <img
              src="https://via.placeholder.com/800x600"
              alt=""
              data-demo-src="assets/img/demo/unsplash/popovers/pages/imdb.jpg"
            />
            <div className="logo-container">
              <img
                src="https://via.placeholder.com/150x150"
                alt=""
                data-demo-src="assets/img/vector/icons/logos/metamovies.svg"
                data-page-popover="9"
              />
            </div>
          </div>
          <h3>Intern</h3>
          <p>Metamovies</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">May 2018</div>
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
                data-page-popover="9"
              />
            </div>
          </div>
          <h3>Intern</h3>
          <p>Quick Fashion</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">Feb 2018</div>
        </div>
        {/* <!--Timeline Item--> */}
        <div className="timeline-item">
          <div className="image-container">
            <img
              src="https://via.placeholder.com/800x600"
              alt=""
              data-demo-src="assets/img/demo/unsplash/popovers/pages/nuclearjs.jpg"
            />
            <div className="logo-container">
              <img
                src="https://via.placeholder.com/150x150"
                alt=""
                data-demo-src="assets/img/vector/icons/logos/nuclearjs.svg"
                data-page-popover="9"
              />
            </div>
          </div>
          <h3>Intern</h3>
          <p>Nuclearjs</p>
          <div className="more">
            <p>
              Lorem ipsum sit dolor amet is a dummy text used by typographers.
            </p>
          </div>
          <div className="date">Jan 2018</div>
        </div>
      </div>

      <div id="slider-dots-jobs-glider" className="dots"></div>
    </div>
  );
};

export default JobContentPart;
