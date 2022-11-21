import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { ExceptionMap } from "antd/lib/result";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import Rate from "./Rate";
import { Button } from "antd";

const Cards = ({ item, keyId, sort }) => {
  let navigate = useNavigate();
  // chuyển tiếng việt có dấu thành không dấu
  function RemoveAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  function moveToProduct(Name) {
    navigate(`/product/filter/${Name}`);
  }

  console.log(53, process.env.REACT_APP_SEA_FOOD_URL);
  return (
    <div
      key={keyId}
      className="home_cards-itm"
    >
      <div className="cards-container">
        <div className="cards">
          <div className="item_image-box"
            onClick={() => {
              moveToProduct(RemoveAccents(item.productName).split(" ").join(""));
            }}
          >
            <div className="image_box">
              <img
                className="image_box-image"
                src={process.env.REACT_APP_SEA_FOOD_URL + item.productPic[0]}
                alt=""
              />
            </div>
          </div>
          <div>
            <h2 className="ProductName">{item.productName}</h2>
            <p>Loại: {item.idCategory.categoriesName}</p>
            <h1 className="price-product">Giá: {item.price}</h1>
            <p>Số lượng: {item.storage}</p>
            <Button className="btn-detail">Xem chi tiết</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
