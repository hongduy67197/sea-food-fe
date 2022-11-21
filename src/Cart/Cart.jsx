import React from "react";
import "../css/product.css";
import Logo from "./logo.jpg";
import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import { notification, Space } from "antd";
import { ConsoleSqlOutlined, WarningOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApi, postApi } from "../api/config";
import { patchApi } from "../api/config";
import Header from "../compunentes/header/Header";
import Footer from "../compunentes/footer/Footer";
function Cart(props) {
  const [productData, setProductData] = useState([]);
  const [productDatas, setProductDatas] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getApi("/user/carts");
        setProductDatas(data.data.cart.listProduct);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, []);

  const idProduct = 1;
  const Navigate = useNavigate();
  const [product, setProduct] = useState(productData);
  const [Quantity, setQuantity] = useState(0);
  //================================================
  var newArr = [];
  const [dataNew, setDataNew] = useState([]);

  const openNotification = async (placement) => {
    if (total === 0) {
      notification.info({
        message: `Thông báo !!!`,
        description: "Bạn chưa chọn đơn hàng nào !!!",
        icon: <WarningOutlined style={{ color: "#108ee9" }} />,
        placement,
        duration: 3,
      });
    } else {
      for (let i = 0; i < productData.length; i++) {
        if (productData[i].isChecked === true) {
          newArr.push(productData[i]);
        }
      }
      await postApi("http://localhost:3150/user/order", {
        address: "Thanh Xuân - Hà Nội",
        total: 14000000,
        phone: "0936666666",
      });
      Navigate("/user/order");
      setDataNew(newArr);
      var filterObj = productData.filter((item) => item.isChecked !== true);
      setProductData(filterObj);
    }
  };
  //================================================
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getIndex, setGetIndex] = useState(0);

  let showModal = (index, id) => {
    setGetIndex(index);
    productData[index].quantity = productData[index].quantity - 1;
    let quantity = productData[index].quantity;

    if (productData[index].quantity > 0) {
      patchApi(`http://localhost:3150/user/carts`, {
        idProduct: id,
        quantity: -1,
      })
        .then((data) => {
          setQuantity(Quantity + 1);
          setProduct(...productData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      productData[index].quantity = 1;
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    patchApi(`http://localhost:3150/user/carts`, {
      idProduct: productData[getIndex].idProduct._id,
      quantity: 0,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    productData.splice(getIndex, 1);
    setQuantity(Quantity + 1);
    setProduct(...productData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log(productData[getIndex].idProduct._id);

    setQuantity(Quantity + 1);
    setProduct(...productData);
  };
  //===================================================
  function upQuantity(index, id) {
    productData[index].quantity = productData[index].quantity + 1;
    // cartsQuantity = productData[index].quantity + 1;
    patchApi(`http://localhost:3150/user/carts`, {
      idProduct: id,
      quantity: 1,
    })
      .then((data) => {
        setQuantity(Quantity + 1);
        setProduct(...productData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //===============================================
  async function deleteProduct(index, id) {
    try {
      let a = await patchApi(`http://localhost:3150/user/carts`, {
        idProduct: id,
        // quantity: ,
      });
      setQuantity(Quantity + 1);
      setProduct(...productData);
    } catch (error) {
      console.log(error);
    }
    productData.splice(index, 1);
  }
  //=============================================================
  function handleChange(e) {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      var tempUser = productData.map((val) => {
        return { ...val, isChecked: checked };
      });
      setProductData(tempUser);
    } else {
      var tempUser = productData.map((val) =>
        val._id == name ? { ...val, isChecked: checked } : val
      );
      setProductData(tempUser);
    }
  }
  //============================================
  var count1 = 0;
  var total = 0;
  for (let i = 0; i < productData.length; i++) {
    if (productData[i].isChecked === true) {
      total +=
        Number(productData[i].idProduct.price) *
        Number(productData[i].quantity);
      count1++;
    }
  }
  function Home() {
    Navigate("/");
  }
  const [quantitys, setQuantitys] = useState(1);
  const domain = process.env.REACT_APP_SEA_FOOD_URL;

  console.log(productDatas);
  return (
    <>
      {/* <Header></Header> */}
      <div className="main-giohang">
        <div className="Gio_hang">
          <div className="title">
            <div className="title-chil">
              <div className="letf-title">
                <div className="name-title" onClick={Home}>
                  Giỏ Hàng
                </div>
              </div>
              <div className="right-title">
                <img
                  src="//icms-image.slatic.net/images/ims-web/839b66fb-6c8e-4e46-8a80-06a5e08fb4d4.png"
                  alt=""
                  style={{ width: "250px" }}
                />
              </div>
            </div>
          </div>
          {productDatas.length > 0 ? (
            <div className="container_body">
              <div className="tab-wapper">
                <div className="div-gohome"></div>
                <div className="cart_info">
                  Bạn đang có {2} sản phẩm trong giỏ hàng
                </div>
                <div className="title-table">
                  <div className="inp-checkall">
                    <input
                      id="check"
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !productData.some((val) => val?.isChecked !== true)
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="info-sanpham">Sản Phẩm</div>
                  <div className="info-dongia">Đơn Giá</div>
                  <div className="info-soluong">Số Lượng</div>
                  <div className="info-thanhtien">Thành Tiền</div>
                  <div className="info-thaotac">Thao Tác</div>
                </div>
                {productDatas.map((value, index) => {
                  return (
                    <div className="list-sanpham" key={index}>
                      <div className="inp-checkall">
                        <input
                          id="check"
                          type="checkbox"
                          name={value._id}
                          onChange={handleChange}
                          checked={value?.isChecked || false}
                        />
                      </div>
                      <div className="img-list">
                        <img
                          className="Img_product"
                          src={domain + `${value.idProduct.productPic[0]}`}
                        />
                      </div>
                      <div className="nameProduct">
                        {value.idProduct.productName}
                      </div>
                 
                      <div className="info-dongia">
                        {value.idProduct.price.toLocaleString()}
                        <sup>đ</sup>
                      </div>
                      <div className="info-list-soluong">
                        <>
                          <Button
                            type="primary"
                            onClick={() => {
                              showModal(index, value.idProduct._id);
                            }}
                          >
                            -
                          </Button>
                          <Modal
                            title="Bạn chắc chắn muốn bỏ sản phẩm này"
                            visible={isModalVisible}
                            okText="Xác nhận"
                            cancelText="Hủy bỏ"
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <p>
                              {/* {
                                productData[getIndex].idProduct.idProductCode
                                  .productName
                              } */}
                              {/* ({productData[getIndex].idProduct.color}) */}
                            </p>
                            <div className="img-list">
                              {/* <img
                                className="Img_product"
                                src={`http://localhost:3150${productData[getIndex].idProduct.productPic[0]}`}
                              /> */}
                            </div>
                          </Modal>
                        </>

                        <div className="quantity-result">{value.quantity}</div>
                        <button
                          onClick={() => upQuantity(index, value.idProduct._id)}
                          className="btn1"
                        >
                          +
                        </button>
                      </div>
                      <div className="info-list-thanhtien">
                        {(
                          Number(value.idProduct.price) * Number(value.quantity)
                        ).toLocaleString()}
                        <sup>đ</sup>
                      </div>
                      <div className="info-list-thaotac">
                        <p
                          className="text-xoa"
                          onClick={() =>
                            deleteProduct(index, value.idProduct._id)
                          }
                        >
                          Xóa
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="gird-item1">
                  {/* {productDatas.map((value, index) => {
					console.log(value);
					return (
						<div key={index}>
							<p>{value.quantity}</p>
						</div>
					)
				  })} */}
                </div>

                <div className="info_payment">
                  <div className=" inp-payment">
                    <input
                      id="check"
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !productData.some((val) => val?.isChecked !== true)
                      }
                      onChange={handleChange}
                    />
                    <div className="text-all">Chọn tất cả</div>
                  </div>
                  <div className="return-payment">
                    <div className="title-payment price-total">
                      Tổng thanh toán ({count1} sản phẩm) :{" "}
                      {total.toLocaleString()} <sup>đ</sup>
                    </div>
                    <>
                      <Space>
                        <Button
                          className="payment-btn"
                          type="primary"
                          onClick={() => openNotification("top")}
                        >
                          Mua Hàng
                        </Button>
                      </Space>
                    </>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="giohang_trong">
              <div className="flex-giohang">
                <div className="icon-giohang">
                  <i class="fa-solid fa-cart-plus"></i>
                </div>
                <div className="text-conpoment">
                  Không có sản phầm nào trong giỏ hàng.
                </div>
                <button onClick={Home} className="btn-gohome">
                  Về Trang Chủ
                </button>
                <div className="info-text">
                  Khi cần trợ giúp vui lòng gọi
                  <span className="blue-text">1800.1060</span> hoặc
                  <span className="blue-text">028.3622.1060</span> (7h30 - 22h)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Cart;
