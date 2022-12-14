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
  const [sumTotal, setSumTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getApi("/user/carts");
        setProductDatas(data.data.cart.listProduct);
        const sumCart = data.data.cart.listProduct.reduce((sum, ele) => {
          return sum + ele.idProduct.price * ele.quantity;
        }, 0);

        setSumTotal(sumCart);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, [count]);

  const idProduct = 1;
  const Navigate = useNavigate();
  //================================================
  var newArr = [];

  const openNotification = async () => {
    setIsModalVisible(true);
  };
  //================================================
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getIndex, setGetIndex] = useState(0);

  let showModal = async (index, id) => {
    try {
      setGetIndex(index);
      const newQuantity = productDatas[index].quantity - 1;
      if (productDatas[index].quantity > 0) {
        await patchApi(`/user/carts`, {
          idProduct: id,
          quantity: newQuantity,
        });

        setCount(count + 1);
      } else {
        productDatas[index].quantity = 1;
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = async () => {
    try {
      setIsModalVisible(false);
      const order = await postApi(`user/order`, {
        address: document.querySelector(".order-form-address").value,
        address: document.querySelector(".order-form-phone").value,
      });
      Navigate("/user/order/" + order.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //===================================================
  async function upQuantity(index, id) {
    try {
      const newQuantity = productDatas[index].quantity + 1;
      const checkProduct = await getApi("user/product/get-one-product/" + id);
      if (checkProduct.data.product.storage < newQuantity) return alert("khong du ton kho");

      await patchApi(`/user/carts`, {
        idProduct: id,
        quantity: newQuantity,
      });

      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  }
  //===============================================
  async function deleteProduct(index, id) {
    try {
      await patchApi(`/user/carts`, {
        idProduct: id,
        quantity: 0,
      });

      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  }
  var total = 0;

  function Home() {
    Navigate("/");
  }
  const domain = process.env.REACT_APP_SEA_FOOD_URL;

  return (
    <>
      {/* <Header></Header> */}
      <div className="main-giohang">
        <div className="Gio_hang">
          <div className="title">
            <div className="title-chil">
              <div className="letf-title">
                <div className="name-title" onClick={Home}>
                  Trang ch???
                </div>
              </div>
            </div>
          </div>
          {productDatas.length > 0 ? (
            <div className="container_body">
              <div className="tab-wapper">
                <div className="div-gohome"></div>
                <div className="cart_info">
                  B???n ??ang c?? {productDatas.length} s???n ph???m trong gi??? h??ng
                </div>
                <div className="title-table">
                  <div className="info-sanpham">S???n Ph???m</div>
                  <div className="info-dongia">????n Gi??</div>
                  <div className="info-soluong">S??? L?????ng</div>
                  <div className="info-thanhtien">Th??nh Ti???n</div>
                  <div className="info-thaotac">Thao T??c</div>
                </div>
                {productDatas.map((value, index) => {
                  return (
                    <div className="list-sanpham" key={index}>
                      <div className="img-list">
                        <img
                          className="Img_product"
                          src={domain + `${value.idProduct.productPic[0]}`}
                        />
                      </div>
                      <div className="nameProduct">{value.idProduct.productName}</div>

                      <div className="info-dongia">
                        {value.idProduct.price.toLocaleString()}
                        <sup>??</sup>
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
                        {(Number(value.idProduct.price) * Number(value.quantity)).toLocaleString()}
                        <sup>??</sup>
                      </div>
                      <div className="info-list-thaotac">
                        <p
                          className="text-xoa"
                          onClick={() => deleteProduct(index, value.idProduct._id)}
                        >
                          X??a
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="gird-item1"></div>
                <div className="info_payment">
                  <div className="return-payment">
                    <div className="title-payment price-total">
                      T???ng thanh to??n ({productDatas.length} s???n ph???m) : {sumTotal.toLocaleString()}{" "}
                      <sup>??</sup>
                    </div>
                    <>
                      <Space>
                        <Button
                          className="payment-btn"
                          type="primary"
                          onClick={() => openNotification("top")}
                        >
                          Mua H??ng
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
                <div className="text-conpoment">Kh??ng c?? s???n ph???m n??o trong gi??? h??ng.</div>
                <button onClick={Home} className="btn-gohome">
                  V??? Trang Ch???
                </button>
                <div className="info-text">
                  Khi c???n tr??? gi??p vui l??ng g???i
                  <span className="blue-text">1800.1060</span> ho???c
                  <span className="blue-text">028.3622.1060</span> (7h30 - 22h)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Th??ng tin nh???n h??ng"
        visible={isModalVisible}
        okText="X??c nh???n"
        cancelText="H???y b???"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input type="text" placeholder="address" className="order-form order-form-address" />
        <input type="text" placeholder="phone" className="order-form order-form-phone" />
      </Modal>
      <Footer></Footer>
    </>
  );
}

export default Cart;
