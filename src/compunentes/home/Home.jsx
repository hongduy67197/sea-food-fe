import "../home/Home.css";
import { React, useEffect, useState } from "react";
import axios from "../../axios";
import SeeMore from "../home/homePage/SeeMore";
import ListProduct from "./homePage/ListProduct";

import { WechatOutlined, ThunderboltFilled } from "@ant-design/icons";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Categories from "../categories/Categories";
import Chat from "./homePage/Chat";
import HomeFilter from "./homeFillter/HomeFilter";
import { getApi } from "../../api/config";

const Home = () => {
  const [productCode, setProductCode] = useState([]);
  const [product, setProduct] = useState([]);
  const [numberShow, setNumberShow] = useState(20);
  const [Slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [NewIcon, setNewIcon] = useState([]);

  function seeMore() {
    setNumberShow(numberShow + 20);
  }

  // Product Code
  useEffect(() => {
    async function getData() {
      try {
        const data = await getApi("/user/productlist");
        setProduct(data.data.listProductList);

        const categoryRes = await getApi("/user/get-all-category");
        setCategories(categoryRes.data.categories);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, []);

  // dùng useState và useEffect để lắng nghe thay đổi phía đường dẫn rồi từ đó render lại theo trường đc sort
  // useState --- tạo giá trị ban đầu là 0 để làm trung gian của sort
  const [sort, setSort] = useState(0);

  useEffect(() => {
    let cloneProductCode = [...productCode]; // tạo productCode clone để không sửa vào data gốc rồi set lại productCode clone
    if (sort === 1) {
      cloneProductCode.sort((after, before) => {
        return after.newPrice - before.newPrice;
      });
    }
    if (sort === -1) {
      cloneProductCode.sort((after, before) => {
        return before.newPrice - after.newPrice;
      });
    }
    setProductCode(cloneProductCode); //set lại productCode khi có đáp ứng đủ điều kiện ( đk được truyền bên select HomeFilter)
  }, [sort]); // truyền sort để lắng nghe thay đổi

  return (
    <>
      <Header></Header>
      <div className="home">
        <div className="home-container">
          <div >
            <img src="https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/nkdkswkqoc/201704/original/resize_images1869171_tom_hum_binh_ba.jpg" alt="" className="home-banner" />
          </div>
          <Categories categories={categories} />
          <div className=" box-checkbox">
            <p className="total-product">{product.length} Điện Thoại</p>
            <span className="product-item-flash">
              <ThunderboltFilled className="item-flash-icon" />
              GIAO SIÊU NHANH
            </span>
            {/* truyền productCode và setSort vào để lấy giá trị render  */}
            <span className="HomeFilter">
              {" "}
              <HomeFilter productCode={product} setSort={setSort} />
            </span>
          </div>
          <Chat />
          <div className="home-container-filter">
            <div className="home-page-product">
              <ListProduct
                sort={sort}
                productCode={product}
                categories={categories}
                numberShow={numberShow}
                NewIcon={NewIcon}
              />
            </div>
          </div>
          <SeeMore seeMore={seeMore} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
