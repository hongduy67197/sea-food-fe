import React, { useEffect, useState } from "react";
import "../App.css";
import "../asset/css/base-productChild.css";
import Header from "../compunentes/header/Header";
import Footer from "../compunentes/footer/Footer";
import { getApi, patchApi } from "../api/config";
import { toast } from "react-toastify";

function ProductChild(props) {
  const { idProduct } = props;
  const [getDataShow, setGetDataShow] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityProduct, setQuantityProduct] = useState("");
  const domain = process.env.REACT_APP_SEA_FOOD_URL;
  const [triggerCart, setTriggerCart] = useState(0);
  const [mountCart, setMountCart] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getApi(`/user/product/get-one-product/${idProduct}`);
        setGetDataShow(data.data.product);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, [props]);

  useEffect(() => {
    console.log("_inAPIcart");
    async function getData() {
      try {
        const data = await getApi(`/user/carts`);
        setMountCart(data.data.cart.listProduct.length);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, [triggerCart]);

  function addCard(idProduct, quantity) {
    async function pathCard() {
      try {
        const data = await patchApi(`/user/carts/add-to-cart`, {
          idProduct,
          quantity,
        });
        console.log("numberCart", data.data.cart.listProduct.length);
        setMountCart(data.data.cart.listProduct.length);
        toast.success("Đã thêm sản phẩm vào giỏ hàng", {
          position: "top-left",
          autoClose: 1000,
        });
      } catch (error) {
        console.log(39, error);
      }
    }
    pathCard();
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function onClickAddToCart(idProduct, quantity) {
    const cookie = getCookie("user");
    if (!cookie || cookie == "undefined") {
      return toast.error("chưa login", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    addCard(idProduct, quantity);
  }

  return (
    <>
      <Header mountCart={mountCart} setMountCart={setMountCart}></Header>
      <div className="detail__container">
        {getDataShow && (
          <div className="detail__container1">
            <img
              src={domain + getDataShow.productPic[0]}
              alt="detail__img"
              className="detail__img"
            />
            <div>
              <p className="detail__name">
                <span>Tên sản phẩm : </span>
                {getDataShow.productName}
              </p>
              <p className="detail__price">
                <span>Giá : </span>
                {getDataShow.price.toLocaleString()} <span>VND</span>
              </p>
              <p className="detail__storage">
                <span>Hàng còn trong kho : </span>
                {getDataShow.storage}
                <span> {getDataShow.unit}</span>
              </p>
              <p className="detail__createDate">
                <span>Ngày đóng gói : </span>
                {new Date(getDataShow.createDate).toLocaleDateString("en-GB")}
              </p>
              <input
                type="number"
                className="detail__input"
                defaultValue={1}
                max={getDataShow.storage}
                min={0}
                onChange={(e) => {
                  if (e.target.value > getDataShow.storage || e.target.value <= 0) {
                    alert("Số lượng phải nằm trong khoảng 0 đến " + getDataShow.storage);
                  }
                  setQuantity(e.target.value);
                }}
              />
              <button
                className="detail__addButton"
                onClick={() => {
                  onClickAddToCart(idProduct, quantity);
                  setTriggerCart(Math.floor(Math.random() * 100) + 1);
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductChild;
