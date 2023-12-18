import { ListFriend, ListPhoto } from "../section";

interface PersonalInfoPartProps {
  isActive: boolean;
  userId: string;
}

const PersonalInfoPart = ({ isActive, userId }: PersonalInfoPartProps) => {
  // const [medias, setMedias] = useState<Media[]>([]);
  // const [getMediaPost] = useLazyGetPostMediaByUserIdQuery();
  // useEffect(() => {
  //   async function fetchData() {
  //     const { data }: any = await getMediaPost({
  //       userId,
  //       type: MediaType.VIDEO,
  //       pageSize: 3,
  //       pageNumber: 0,
  //     }).unwrap();
  //     if (data?.data) {
  //       setMedias(data?.data);
  //     }
  //   }
  //   fetchData();
  // }, [userId]);

  return (
    <div
      id="personal-content"
      className={`content-section ${isActive ? "is-active" : ""}`}>
      {/* <!-- Friends about card --> */}
      <ListFriend userId={userId}></ListFriend>
      {/* <!-- Photos about card --> */}
      <ListPhoto userId={userId}></ListPhoto>
      {/* <!-- Videos about card --> */}
      {/* <div className="about-card">
        <div className="header">
          <div className="icon-title">
            <i className="mdi mdi-video"></i>
            <h3>Videos</h3>
          </div>
          <div className="actions">
            <div className="button-wrapper">
              <a className="button">Tất cả Videos</a>
            </div>
            <WidgetDropdown wclassName="is-accent is-right">
              <DropdownItem title="Video" subTitle="Quản lý video.">
                <FiEdit3></FiEdit3>
              </DropdownItem>
              <DropdownItem title="Tải video" subTitle="Tải video mới lên.">
                <FiPlus></FiPlus>
              </DropdownItem>
              <DropdownItem
                title="Tùy chỉnh video"
                subTitle="Mở tùy chỉnh video.">
                <FiSettings></FiSettings>
              </DropdownItem>
            </WidgetDropdown>
          </div>
        </div>
        <div className="body has-flex-list">
          <!-- Videos -->
          <div className="video-list">
            <!-- Video item -->
            <div className="video-wrapper">
              <div className="video-overlay"></div>
              <div className="video-length">02:32</div>
              <div className="small-like">
                <div className="inner">
                  <div className="like-overlay"></div>
                  <i data-feather="heart"></i>
                </div>
              </div>
              <img
                src="https://via.placeholder.com/800x600"
                data-demo-src="assets/img/demo/profile/about/videos/1.jpg"
                alt=""
              />
              <div className="video-button" data-video-id="LTrzSSf0YlA">
                <img src="assets/img/icons/video/play.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PersonalInfoPart;
