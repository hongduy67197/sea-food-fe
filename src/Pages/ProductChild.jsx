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
  const domain = process.env.REACT_APP_SEA_FOOD_URL;

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

  function addCard(idProduct, quantity) {
    async function pathCard() {
      try {
        await patchApi(`/user/carts/add-to-cart`, {
          idProduct,
          quantity,
        });
      } catch (error) {
        console.log(39, error);
      }
    }
    pathCard();
  }
  return (
    <>
      <Header></Header>
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
                  if (
                    e.target.value > getDataShow.storage ||
                    e.target.value <= 0
                  ) {
                    alert(
                      "Số lượng phải nằm trong khoảng 0 đến " +
                        getDataShow.storage
                    );
                  }
                  setQuantity(e.target.value);
                }}
              />
              <button
                className="detail__addButton"
                onClick={() => {
                  addCard(idProduct, quantity);
                  toast.info("Sản phẩm đã được thêm vào giỏ hàng", {
                    position: "top-center",
                    autoClose: 3000,
                  });
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
