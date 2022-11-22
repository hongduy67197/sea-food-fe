import React from "react";
import Header from "../../../Components/Header/header";
import "./khohangchinhsua.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "./product.css";
import { getApi } from "../../../api/config";

var allcode;
var alllist;
var count = 0;
function Khohang(props) {
  const [money, setmoney] = useState([]);
  const [statis, setstatis] = useState([]);

  useEffect(() => {
    getApi(`/admin/product/list`)
      .then(function (response) {
        alllist = response.data.length;
        setmoney(response.data);
        setstatis(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  money.length > 0 ? count = money.reduce((sum, cur) => {


    return sum + (cur.price * cur.storage)
  }, 0) : count = 0;
  return (
    <div>
      <Header></Header>
      <div className="khohang">
        <div className="statisbox">
          <div className="statis">
            <div
              className="statisicon"
              style={{ background: "rgb(147, 255, 147)" }}
            >
              <p>
                <i className="fa-solid fa-clipboard-list"></i>
              </p>
            </div>
            <div className="statistext">
              <h3>All List</h3>
              <p>{alllist}</p>
            </div>
          </div>
          <div className="statis">
            <div
              className="statisicon"
              style={{ background: "rgb(169, 209, 255)" }}
            >
              <p style={{ color: "rgb(255, 255, 0)" }}>
                <i className="fa-solid fa-sack-dollar"></i>
              </p>
            </div>
            <div className="statistext">
              <h3>All Money</h3>
              { }
              <p>{count.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="statismid">
          <table id="statistable">
            <thead>
              <tr>
                <th id="stt">STT</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {statis.length == 0 ? null : statis.map(function (value, index) {
                return (
                  <tr key={index}>
                    <td id="stt-td">{index + 1}</td>
                    <td >{value.productName}</td>
                    <td>
                      <img
                        src={"http://localhost:3150" + value.productPic[0]}
                        alt=""
                      />
                    </td>
                    <td>{value.price.toLocaleString()}</td>
                    <td>{value.storage}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Khohang;
