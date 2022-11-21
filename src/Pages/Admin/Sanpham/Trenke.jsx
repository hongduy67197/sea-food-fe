import Header from '../../../Components/Header/header';
import './product.css';
import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserCookie, refreshToken } from "../../../refreshToken";
import { getApi, putApi, deleteApi } from '../../../api/config'

var vitri;
var maso;
var vitriup;
var masoup;
var vitrilist;
var masolist;
var vitrifixlist;
var masofixlist;
function Trenke(props) {
  // Bat dau
  const [data, setdata] = useState([]);
  const [brand, setbrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [sign, setsign] = useState(1);

  function changesign() {
    setsign(sign + 1);
  }
  useEffect(() => {
    async function getAllUser() {
      let token = getUserCookie("user");
      console.log(147, token);
      try {
        const res = await getApi("/admin/product/list");
        setdata(res.data);

        const categories = await getApi("admin/categories");
        setCategory(categories.data)
      } catch (error) {
        console.log(168, error);
      }
    }
    getAllUser();
  }, [sign]);

  useEffect(() => {
    async function getAllUser() {
      let token = getUserCookie("user");
      console.log(147, token);
      try {
        const res = await getApi("/admin/categories");
        setbrand(res.data);
      } catch (error) {
        console.log(168, error);
      }
    }
    getAllUser();
  }, [sign]);

  // ket thuc
  var abcarr;
  var cleararr = [];
  var clearcode = [];
  const [hien, sethien] = useState([]);
  const [productlist, setproductlist] = useState([]);
  const [clearao, setclearao] = useState([]);
  const [clearaocode, setclearaocode] = useState([]);

  // async function onclear(id, index) {
  //   vitri = index;
  //   maso = id;
  //   try {
  //     let data = await getApi(`/admin/productcode/${id}`)
  //     clearcode.push(data.data);
  //     setclearaocode(clearcode);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   document.querySelector(".boxclear").style.display = "block";
  // }
  function accept() {
    console.log(vitri, maso);
    axios
      .delete(`http://localhost:3150/admin/productcode/${maso}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    hien.splice(vitri, 1);
    console.log(hien);
    changesign();
    closeclear();
  }
  function closeclear() {
    document.querySelector(".boxclear").style.display = "none";
  }
  function closeclearlist() {
    document.querySelector(".boxclearlist").style.display = "none";
  }
  function onupdate(id, index) {
    vitriup = index;
    masoup = id;
    document.querySelector(".boxfix").style.display = "block";
    axios
      .get(`http://localhost:3150/admin/productcode/${id}`)
      .then(function (response) {
        document.querySelector(".productName").value =
          response.data.productName;
        document.querySelector(".productType").value =
          response.data.productType;
        document.querySelector(".performanceProduct").value =
          response.data.performanceProduct;
        document.querySelector(".cameraProduct").value =
          response.data.cameraProduct;
        document.querySelector(".specialFeatures").value =
          response.data.specialFeatures;
        document.querySelector(".design").value = response.data.design;
        document.querySelector(".panel").value = response.data.panel;
        document.querySelector(".countSold").value = response.data.countSold;
        document.querySelector(".Sale").value = response.data.Sale;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function closeupdate() {
    document.querySelector(".boxfix").style.display = "none";
    document.querySelector(".boxfixlist").style.display = "none";
  }
  async function update() {
    const form = document.querySelector('#form-product-update');
    const formData = new FormData(form);
    try {
      let response = await putApi(`/admin/product/${masoup}`, formData)
      console.log(response);
      closeupdate();
      changesign();
    } catch (error) {
      console.log(error);
    }
  }
  async function onboxlist(id, index) {
    document.querySelector(".boxlist").style.display = "block";
    document.querySelector(".boxtable").style.display = "none";
    try {
      let response = await getApi(`/admin/product/${id}`)
      console.log(177, response);
      setproductlist(response.data);
      document.querySelector(".sptk").innerHTML =
        response.data[0].productName;
    } catch (error) {
      console.log(error);
    }
  }
  async function onclearlist(id, index) {
    vitrilist = index;
    masolist = id;
    try {
      let response = await getApi(`/admin/product/${id}`)
      cleararr.push(response.data);
      setclearao(cleararr);
      document.querySelector(".boxclearlist").style.display = "block";
    } catch (error) {
      console.log(error);
    }
  }
  async function acceptlist() {
    try {
      let data = await deleteApi(`http://localhost:3150/admin/product/${masolist}`)
      productlist.splice(vitrilist, 1);
      changesign();
      closeclearlist();
    } catch (error) {
      console.log(error);
    }
  }
  async function onupdatelist(id, index) {
    document.querySelector(".boxfixlist").style.display = "block";
    vitrifixlist = index;
    masofixlist = id;
    try {
      let response = await getApi(`http://localhost:3150/admin/product/${id}`)
      document.querySelector(".pricevinh").value = response.data.price;
      document.querySelector(".priceRange").value = response.data.priceRange;
      document.querySelector(".storage").value = response.data.storage;
      document.querySelector(".ram").value = response.data.ram;
      document.querySelector(".rom").value = response.data.rom;
      document.querySelector(".color").value = response.data.color;
    } catch (error) {
      console.log(error);
    }
  }
  async function updatelist() {
    var price = document.querySelector(".pricevinh").value;
    var priceRange = document.querySelector(".priceRange").value;
    var storage = document.querySelector(".storage").value;
    var ram = document.querySelector(".ram").value;
    var rom = document.querySelector(".rom").value;
    var color = document.querySelector(".color").value;
    console.log(productlist[vitrifixlist]);
    productlist[vitrifixlist].price = price;
    productlist[vitrifixlist].priceRange = priceRange;
    productlist[vitrifixlist].storage = storage;
    productlist[vitrifixlist].ram = ram;
    productlist[vitrifixlist].rom = rom;
    productlist[vitrifixlist].color = color;
    try {
      let response = await putApi(`/admin/product/${masofixlist}`, {
        price,
        priceRange,
        storage,
        ram,
        rom,
        color,
      })
      closeupdate();
      changesign();
    } catch (error) {
      console.log(error);
    }
  }
  console.log(313, productlist)
  return (
    <div>
      <Header></Header>
      <div className="newproduct">
        <h1 className="sptk">Sản phẩm trên kệ</h1>

        <div className="boxtable">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {data.map(function (value, index) {
                return (
                  <tr className="codehover" key={index}>
                    <td>{index + 1}</td>
                    <td>{value.productName}</td>
                    <td>
                      <img
                        src={process.env.REACT_APP_SEA_FOOD_URL + value.productPic}
                        alt=""
                      />
                    </td>
                    <td>{value.storage}</td>
                    <td>
                      <button
                        style={{ margin: "0px 5px" }}
                        onClick={() => onupdate(value._id, index)}
                        className="stockbut"
                      >
                        <i className="fa-solid fa-repeat"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="boxlist">
          <table className="onetable">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Kho</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody className="onetbody">
              {productlist.map(function (value, index) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.productName}</td>
                    <td>
                      <img
                        src={process.env.REACT_APP_SEA_FOOD_URL + value.productPic[0]}
                        alt=""
                      />
                    </td>
                    <td>{value.price.toLocaleString()}</td>
                    <td>{value.storage}</td>
                    <td>
                      <button
                        onClick={() => onupdatelist(value._id, index)}
                        className="butlist"
                      >
                        <i className="fa-solid fa-repeat"></i>
                      </button>
                      <button
                        onClick={() => onclearlist(value._id, index)}
                        style={{ marginLeft: "15px" }}
                        className="butlist"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="boxfix">
          <h3>Bảng thông tin chỉnh sửa</h3>
          <form id='form-product-update' action="">
            <div className="inboxfix">
              <span>productName:</span>{" "}
              <input className="productName" type="text" name='productName'/>
            </div>
            <div className="inboxfix">
              <span>price:</span> <input className="pricevinh" type="text" name='price' />
            </div>
            <div className="inboxfix">
              <span>storage:</span> <input className="storage" type="text" name='storage'/>
            </div>
            <div className="inboxfix">
              <span>category:</span> 
              <select className='form-product-list-category' name="idCategory" id="">
                {category.map((ele, index) => {
                  return (
                    <option value={ele._id} key={index}>{ele.categoriesName}</option>
                  )
                })}
              </select>
            </div>
            <div className="inboxfix">
              <span>thumbNail:</span> <input className="storage" type="file" name='productPic'/>
            </div>
          </form>
          <div className="boxfixbut">
            <button onClick={update}>Update</button>
            <button onClick={closeupdate}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trenke;
