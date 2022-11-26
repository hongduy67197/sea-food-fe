import { ShoppingCartOutlined } from "@ant-design/icons";
import Search from "../header/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getApi } from "../../../../api/config";
import Categories_sea from "../categories/Categories";
import "./header.css";

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const Header = (props) => {
  const { filter, changeFilter, categories } = props;
  const navigate = useNavigate();
  const userInfo = useSelector(function (state) {
    return state.user;
  });

  console.log(16, userInfo);
  const imager = userInfo.avatar ? process.env.REACT_APP_CLIENT_URL + userInfo.avatar : null;
  function on_mypage() {
    navigate("/User/UserPage");
  }
  async function logout() {
    // await axios.post("/user/logOut");
    delete_cookie("user");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userCart");
    window.location.reload(true);
    navigate("/");
  }
  function moveToCart() {
    navigate("/Cart");
  }
  const [cartNumber, setCartNumber] = useState(0);
  useEffect(() => {
    getApi("/user/carts")
      .then((data) => {
        setCartNumber(data.data.cart.listProduct.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.quatityCart]);

  return (
    <>
      <header className="Cuong__header">
        <div className="HeaderVietnamese">
          <div className="gird">
            <nav className="header_navbar">
              <ul className="header_navbar-list">
                <li className="header_navbar-item header_navbar-item-noti-notification-display">
                  <div className="header_navbar-item-noti">
                    <header className="header_noti-notification">
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
                    <div className="header_mypage">
                      <img src={imager} alt="" className="header_navbar_item_userimager" />
                      <span>{userInfo.username ? userInfo.username : "hello"}</span>
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

            {/* Header Search */}
            <div className="header-with-search">
              <Link to="/">
                <div className="header_logo">
                  <div className="header_logo_my">Sea Food</div>
                </div>
              </Link>
              <div className="header_search-section">
                <div className="header_search">
                  <Search
                    filter={filter}
                    changeFilter={(data) => {
                      changeFilter(data);
                    }}
                  />
                </div>
              </div>
              <div className="header_cart">
                <div
                  onClick={() => {
                    moveToCart();
                  }}
                  className="header_cart-wrap"
                >
                  <ShoppingCartOutlined className="header_cart-icon" />
                  <div className="count-number-cart">{cartNumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
