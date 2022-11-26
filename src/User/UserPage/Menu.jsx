import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import comment from "../../assets/images/comment.png";
import order from "../../assets/images/orders.png";
import user from "../../assets/images/user.png";
import userlogo from "../../assets/images/userlogo.jpg";
import "./MenuCss.css";

import Button from "@mui/material/Button";
function Menu(props) {
  const navigate = useNavigate();
  const userInfo = useSelector(function (state) {
    return state.user;
  });
  const userName = userInfo.username ? userInfo.username : "hello";
  const imager = userInfo.avatar ? process.env.REACT_APP_CLIENT_URL + userInfo.avatar : userlogo;

  function onof_mypage() {
    // navigate()
    props.onof_hoso();
    props.on_mypage();
    props.of_thongBao();
    props.onof_mypage();
    document.querySelector(".menu_comment_list").style.display = "none";
    document.querySelector(".menu_mypage_list").style.display = "block";
  }
  function onof_orders() {
    props.of_mypage();
    props.of_thongBao();
    props.onof_order();
    document.querySelector(".menu_comment_list").style.display = "none";
    document.querySelector(".menu_mypage_list").style.display = "none";
  }
  function onof_comment() {
    props.of_mypage();
    props.onof_comment();
    props.on_thongBao();
    document.querySelector(".menu_comment_list").style.display = "block";
    document.querySelector(".menu_mypage_list").style.display = "none";
  }
  function onof_voucher() {
    props.of_mypage();
    props.of_thongBao();
    props.onof_voucher();
    document.querySelector(".menu_comment_list").style.display = "none";
    document.querySelector(".menu_mypage_list").style.display = "none";
  }
  // THÔNG BÁO
  function menu_capNhat() {
    props.onof_capNhat();
  }
  // TÀI KHOẢN CỦA TÔI
  function menu_mypage() {
    props.onof_hoso();
  }
  function menu_bank() {
    props.onof_bank();
  }
  function menu_from() {
    props.onof_from();
  }
  function menu_resetpassword() {
    props.onof_resetPassword();
  }
  return (
    <div className="menu_">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "10px 20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "50px", borderRadius: "50%" }}>
            <img src={imager} style={{ width: "30px", height: "30px" }} />
          </div>
          <div>{userName}</div>
        </div>
        <div>
          <Button href="#text-buttons" onClick={onof_mypage}>
            Sửa Hồ Sơ
          </Button>
        </div>
      </div>
      <div className="menu_mypage">
        <img src={user} alt="" />
        <button onClick={onof_mypage}>Tài Khoản Của Tôi</button>
        <div className="menu_mypage_list">
          <p onClick={menu_mypage}>Hồ Sơ</p>
          <p onClick={menu_from}></p>
          <p onClick={menu_resetpassword}>Đổi Mật Khẩu</p>
        </div>
      </div>
      <div className="menu_orders">
        <img src={order} alt="" />
        <button onClick={onof_orders}>Đơn Mua</button>
      </div>
      <div className="menu_comment">
        <img src={comment} alt="" />
        <button onClick={onof_comment}>Thông Báo</button>
        <div className="menu_comment_list">
          <p onClick={menu_capNhat}>Cập Nhật Đơn Hàng</p>
        </div>
      </div>
    </div>
  );
}

export default Menu;
