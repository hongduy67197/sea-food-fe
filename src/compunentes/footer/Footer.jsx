import React from "react";
import "../footer/footer.css";
import {
  CaretDownOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="main-footer">
      <section className="footer-menu">
        <div className="footer__col">
          <ul className="footer-listMenu">
            <li>Lịch sử mua hàng</li>
            <li>Cộng tác bán hàng cùng</li>
            <li>Chính sách bán hàng</li>
            <li>
              Xem thêm <CaretDownOutlined />{" "}
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <ul className="footer-listMenu">
            <li>Giới thiệu công ty</li>
            <li>Tuyển dụng</li>
            <li>Gửi góp ý, khiếu nại</li>
            <li>Tìm kiếm các cửa hàng liên kết</li>
          </ul>
        </div>
        <div className="footer__col">
          <ul className="footer-listMenu-phone">
            <li>
              <b>Tổng đài hỗ trợ </b> (Miễn phí gọi)
            </li>
            <li>
              Đặt mua:{" "}
              <span className="footer-listMenu-txt-phone"> 1800.1060</span>{" "}
              (7:30 - 22:00)
            </li>
            <li>
              Khiếu nại:{" "}
              <span className="footer-listMenu-txt-phone">1800.1062</span> (8:00
              - 21:30)
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
