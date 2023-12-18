import { Metadata } from "next";
import Link from "next/link";



export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error-wrapper">
        <div className="error-inner has-text-centered">
          <div className="bg-number dark-inverted">404</div>
          <img
            className="light-image"
            src="/img/illustrations/placeholders/3.svg"
            alt=""
          />
          <img
            className="dark-image"
            src="/img/illustrations/placeholders/3.svg"
            alt=""
          />
          <h3 className="dark-inverted">
            Chúng tôi không thể tìm thấy trang đó.
          </h3>
          <p>
            Có vẻ như chúng tôi không thể tìm thấy trang đó. Vui lòng thử lại
            hoặc liên hệ với một quản trị viên nếu vấn đề vẫn tiếp tục.
          </p>
          <div className="button-wrap">
            <Link className="button h-button is-primary is-elevated" href="/">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
