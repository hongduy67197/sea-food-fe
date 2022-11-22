import React, { useState, useEffect } from "react";
import "../css/CreateOrder.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getApi, postApi } from "../api/config";
import { useSelector } from "react-redux";

function CreateOrder(props) {
  // Mảng dữ liệu userInfo
  const [userInfo, setUserInfo] = useState({});
  // dữ liệu user trả về theo phiên đăng nhập
  const userPage = useSelector(function (state) {
    return state.user;
  });
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    async function temps() {
      try {
        const orderList = await getApi("/user/carts");
        setTemp(orderList.data.cart.listProduct);
      } catch (error) {
        console.log(error);
      }
    }
    temps();
  }, []);
  const [open, setOpen] = useState(false);
  // Giữ nguyên địa chỉ cũ.
  const [editInfoOld, setEditInfoOld] = useState(userInfo);
  // Mảng dữ liệu productCart
  const [productCart, setProductCart] = useState([
    {
      id: 1234325,
      ProductName: "iPhone 11 64GB I Chính hãng VN/A",
      price: 1800000,
      quantity: 1,
      productPic: [
        "https://www.techone.vn/wp-content/uploads/2019/04/trang-500x500.jpg",
      ],
    },
    {
      id: 1234326,
      ProductName: "iPhone 12 mini 128GB I Chính hãng VN/A",
      price: 2099000,
      quantity: 2,
      productPic: [
        "https://www.techone.vn/wp-content/uploads/2020/02/images-500x500.jpg",
      ],
    },
    {
      id: 1234327,
      ProductName: "iPhone 12 mini 128GB I Chính hãng VN/A",
      price: 2100000,
      quantity: 3,
      productPic: ["https://hc.com.vn/i/ecommerce/media/ckeditor_2074276.jpg"],
    },
  ]);
  useEffect(() => {
    getUserAddress();
    getProductCart();
  }, []);
  const getUserAddress = async () => {
    try {
      const { data } = await getApi("/user/me");
      setUserInfo(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductCart = async () => {
    try {
      const { data } = await getApi("/user/carts");
      setProductCart(data.cart.productCart);
    } catch (error) {
      console.log(error);
    }
  };
  const postOrder = async () => {
    try {
      const data = await postApi("/user/order", {
        phone: userInfo.phone,
        address: userInfo.address,
      });
    } catch (error) {
      console.log(136, error);
    }
  };
  //=======================================================
  // CÁC HÀM HANDLE:
  const handleClickOpen = () => {
    setEditInfoOld(JSON.parse(JSON.stringify(userInfo))); // làm mất tham chiếu.
    setOpen(true);
  };
  const handleClose = () => {
    // Dữ liệu bị thay đổi
    if (JSON.stringify(userInfo) !== JSON.stringify(editInfoOld)) {
      let res = window.confirm("Bạn có muốn đóng form không?");
      if (res) {
        handleCancel();
      }
    } else {
      setOpen(false);
    }
  };
  const handleEditInfo = (e, type) => {
    switch (type) {
      case "name":
        setUserInfo({
          ...userInfo,
          name: e.target.value,
        });
        break;
      case "phone":
        setUserInfo({
          ...userInfo,
          phone: e.target.value,
        });
        break;
      case "address":
        setUserInfo({
          ...userInfo,
          address: e.target.value,
        });
        break;
      default:
        setUserInfo({ ...userInfo });
    }
  };
  const handleSubmit = (params) => {
    setOpen(false);
  };
  const handleCancel = (params) => {
    setUserInfo(editInfoOld);
    setOpen(false);
  };
  return (
    <div className="main">
      <div className="navbar_link">
        <Link to="/">
          <span className="navbar_shopee">Shopee</span>
          <span className="navbar_payment">Thanh toán</span>
        </Link>
      </div>
      <div className="container_">
        <div className="section-address">
          <div className="address__border-top"></div>
          <div className="address-top">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="address-title">Địa chỉ nhận hàng</span>
          </div>
          <div className="address-inner">
            <div className="address-user">
              <div>{userPage.username}</div>
              <div>{userPage.phone}</div>
            </div>
            <div>{userPage.address}</div>
            <span className="address-default">Mặc định</span>
            <div>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                style={{ display: "none" }}
              ></Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogActions
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                  <Button onClick={handleClose} style={{ color: "red" }}>
                    ĐÓNG
                  </Button>
                </DialogActions>
                <DialogContent>
                  <TextField
                    classes={{ color: "red" }}
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={userPage.username}
                    onChange={(e) => handleEditInfo(e, "name")}
                  />
                  <TextField
                    margin="dense"
                    id="phone"
                    label="Phone"
                    type="phone"
                    fullWidth
                    variant="outlined"
                    defaultValue={userPage.phone}
                    onChange={(e) => handleEditInfo(e, "phone")}
                  />
                  <TextField
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={userPage.address}
                    onChange={(e) => handleEditInfo(e, "address")}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancel} style={{ color: "gray" }}>
                    HỦY BỎ
                  </Button>
                  <Button onClick={handleSubmit}>ĐỒNG Ý</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className="container_">
        <div className="section-product">
          <div className="titles">
            <div className="product-title">Sản phẩm</div>
            <div className="price_">Giá</div>
            <div className="Quantity">Số lượng</div>
            <div className="total">Thành tiền</div>
          </div>
          <div className="product-list-items">
            {temp.length == 0
              ? null
              : temp.map((dataItem, index) => {
                  return (
                    <div className="product-item" key={index}>
                      <div className="product-image">
                        <img
                          src={
                            process.env.REACT_APP_SEA_FOOD_URL +
                            dataItem.idProduct.productPic[0]
                          }
                          alt={"product pic"}
                        />
                        <h3>{dataItem.idProduct.productName}</h3>
                      </div>

                      <div>
                        {dataItem.idProduct.price.toLocaleString()}
                        <sup>đ</sup>
                      </div>
                      <div className="product-quantity">
                        {dataItem.quantity}
                      </div>
                      <div>
                        {(
                          dataItem.quantity * dataItem.idProduct.price
                        ).toLocaleString()}
                        <sup>đ</sup>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      {/* Thành tiền */}
      <div className="container_">
        <div className="payment-list">
          <div className="payment-top">
            <div className="payment-info">
              <div className="subtotal">
                <span>Tổng tiền hàng:</span>
                <span className="total-price">
                  {temp.length != 0
                    ? temp
                        .reduce((s, c) => {
                          return s + c.quantity * c.idProduct.price;
                        }, 0)
                        .toLocaleString()
                    : null}
                  <sup>đ</sup>
                </span>
              </div>
              <div className="payment-shipping">
                <span>Phí vận chuyển:</span>
                <span>
                  0<sup>đ</sup>
                </span>
              </div>
              <div className="total-subtotal">
                <span>Tổng thanh toán:</span>
                <span className="total-payment">
                  {temp.length != 0
                    ? temp
                        .reduce((s, c) => {
                          return s + c.quantity * c.idProduct.price;
                        }, 0)
                        .toLocaleString()
                    : null}
                  <sup>đ</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="payment-bottom">
            <button
              className="payment-send"
              onClick={() => {
                postOrder();
                toast.info("Cảm ơn bạn đã mua hàng", {
                  position: "top-center",
                  autoClose: 3000,
                });
              }}
            >
              PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
