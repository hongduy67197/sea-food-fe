import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { ExceptionMap } from "antd/lib/result";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import Rate from "./Rate";

const Cards = ({ item, keyId, sort }) => {
  let navigate = useNavigate();
  // console.log(10,item,searchTitle, keyId)
//   if (!item.data.length > 0) {
//     item.data = [{ minPrice: "chua set gia" }];
//     item.minPrice = "chưa set giá ";
//   }
//   if (item.data[0].icon == null) {
//     item.data[0].icon = [{ iconName: "not icon" }];
//     item.data[0].icon.iconName = "not icon";
//   }


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
//   const NewSale = item.Sale.replace("%", "") * 1;
//   const NewPrice = item.minPrice - (NewSale * item.minPrice) / 100;

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
            <p className="ProductName">{item.productName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
