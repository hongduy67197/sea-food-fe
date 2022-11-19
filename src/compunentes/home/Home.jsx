import "../home/Home.css";
import { React, useEffect, useState } from "react";
import axios from "../../axios";
import SeeMore from "../home/homePage/SeeMore";
import ListProduct from "./homePage/ListProduct";

import { WechatOutlined, ThunderboltFilled } from "@ant-design/icons";
import Header from "../header/Header";
import Slider from "../slider/Slider";
import Footer from "../footer/Footer";
import Categories from "../categories/Categories";
import Chat from "./homePage/Chat";
import HomeFilter from "./homeFillter/HomeFilter";

const Home = () => {
  const [productCode, setProductCode] = useState([]);
  const [numberShow, setNumberShow] = useState(20);
  const [Slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [NewIcon, setNewIcon] = useState([]);


  function seeMore() {
    setNumberShow(numberShow + 20);
  }

  // Product Code
  useEffect(() => {
    axios
      .get("/user/list")
      .then(function (res) {
        let newList = res.data.dataProductCode.map(function (value) {
          value.newPrice = value.minPrice * (1 - value.Sale.split("%")[0] / 100) // tạo trường mới là newPrice để render ra giao diện
          return value
        })
        setProductCode(newList);
        setSlides(res.data.listSlide);
        setCategories(res.data.listCategories);
        setNewIcon(res.data.dataProductCode[0].data[0].icon);
      })
      .catch(function (err) {
        console.log(36, err);
      });
  }, []);


  // dùng useState và useEffect để lắng nghe thay đổi phía đường dẫn rồi từ đó render lại theo trường đc sort
  // useState --- tạo giá trị ban đầu là 0 để làm trung gian của sort 
  const [sort, setSort] = useState(0);

  useEffect(() => {
    let cloneProductCode = [...productCode] // tạo productCode clone để không sửa vào data gốc rồi set lại productCode clone
    if (sort === 1) {
      cloneProductCode.sort((after, before) => {
        return after.newPrice - before.newPrice
      })
    }
    if (sort === -1) {
      cloneProductCode.sort((after, before) => {
        return before.newPrice - after.newPrice
      })
    }
    setProductCode(cloneProductCode) //set lại productCode khi có đáp ứng đủ điều kiện ( đk được truyền bên select HomeFilter)
  }, [sort]) // truyền sort để lắng nghe thay đổi



  return (
    <>
      <Header></Header>
      <div className="home">
        <div className="home-container">
          <Slider Slides={Slides} />
          <Categories categories={categories} />
          <div className=" box-checkbox">
            <p className="total-product">{productCode.length} Điện Thoại</p>
            <span className="product-item-flash">
              <ThunderboltFilled className="item-flash-icon" />
              GIAO SIÊU NHANH
            </span>
            {/* truyền productCode và setSort vào để lấy giá trị render  */}
            <span className="HomeFilter"> <HomeFilter productCode={productCode} setSort={setSort} /></span>
          </div>
          <Chat />
          <div className="home-container-filter">
            <div className="home-page-product">
              <ListProduct
                sort={sort}
                productCode={productCode}
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
