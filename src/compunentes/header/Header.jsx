import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userlogo from "../../assets/images/userlogo.jpg";
import Categories from "../categories/Categories";
import "../header/header.css";
import Search from "../header/Search";
import PersonIcon from "@mui/icons-material/Person";
import { getApi } from "../../api/config";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const Header = (props) => {
  const { filter, changeFilter, categories, mountCart, setMountCart } = props;

  const navigate = useNavigate();
  const userInfo = useSelector(function (state) {
    return state.user;
  });
  const imager = userInfo.avatar ? process.env.REACT_APP_CLIENT_URL + userInfo.avatar : userlogo;
  function on_mypage() {
    navigate("/User/UserPage");
  }
  async function logout() {
    delete_cookie("user");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userCart");
    window.location.reload(true);
    navigate("/");
  }
  function moveToCart() {
    navigate("/Cart");
  }
  return (
    <>
      <div className="header_app" style={{ padding: " 40px 18vw 0" }}>
        <div style={{ display: "flex" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ minWidth: "150px" }}>
              <div style={{ color: "white", fontSize: "34px", fontWeight: "700" }}>Sea Food</div>
            </div>
          </Link>
          <Search
            filter={filter}
            changeFilter={(data) => {
              changeFilter(data);
            }}
          />
          <div style={{ display: "flex" }}>
            <div>
              <nav className="header_navbar">
                <ul className="header_navbar-list" style={{}}>
                  <li className="header_navbar-item header_navbar-item-noti-notification-display">
                    <div className="header_navbar-item-noti">
                      <header className="header_noti-notification">
                        <img
                          src="https://thumbs.dreamstime.com/b/cute-boy-cartoon-illustration-87282832.jpg"
                          alt=""
                        />
                        <p className="header_noti-notification-noti">Đăng nhập để xem Thông báo</p>
                        <div className="header_navbar-item-noti-from">
                          <Link to="/User/UserSingIn">
                            <p className="header_navbar-item-noti-from-sigIn">Đăng Ký</p>
                          </Link>
                          <Link to="/User/UserLogin">
                            <p className="header_navbar-item-noti-from-sigUp">Đăng Nhập</p>
                          </Link>
                        </div>
                      </header>
                    </div>
                  </li>
                  {userInfo.role ? (
                    <li className="header_navbar_item_mypage">
                      <div style={{ margin: " auto" }}>
                        {userInfo?.username ? (
                          <img src={imager} alt="" className="header_navbar_item_userimager" />
                        ) : (
                          <PersonIcon
                            style={{ color: "white", fontSize: "30px", marginTop: "10px" }}
                          />
                        )}
                      </div>
                      <div className="header_navbar_iteam_mypage_selec">
                        <div className="header_navbar_iteam_mypage_selec-item" onClick={on_mypage}>
                          Tài khoản của tôi
                        </div>
                        <div className="header_navbar_iteam_mypage_selec-item" onClick={logout}>
                          Đăng xuất
                        </div>
                      </div>
                    </li>
                  ) : (
                    <>
                      <li className="header_navbar-item">
                        <Link to="/User/UserSingIn">
                          <button className="header_singin">Đăng Ký</button>
                        </Link>
                      </li>
                      <li className="header_navbar-item header_navbar-item--pillar1">
                        <Link to="/User/UserLogin">
                          <button className="header_login">Đăng Nhập</button>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <IconButton
              aria-label="cart"
              onClick={() => {
                moveToCart();
              }}
            >
              <StyledBadge badgeContent={mountCart} color="secondary">
                <ShoppingCartIcon style={{ color: "white" }} />
              </StyledBadge>
            </IconButton>
          </div>
        </div>
        <div style={{ padding: "20px 0 20px 0" }}>
          <Categories categories={categories} />
        </div>
      </div>
    </>
  );
};

export default Header;
