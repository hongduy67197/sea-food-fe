import React from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div key={keyId} className="home_cards-itm">
      <div className="cards-container">
        <div className="cards">
          <div
            className="item_image-box"
            onClick={() => {
              moveToProduct(RemoveAccents(item.productName).split(" ").join(""));
            }}
          >
            <div className="image_box" style={{ height: "150px" }}>
              <img
                className="image_box-image"
                src={process.env.REACT_APP_SEA_FOOD_URL + item.productPic[0]}
                alt=""
              />
            </div>
          </div>
          <div>
            <h2 style={{ minHeight: "56px" }} className="ProductName">
              {item.productName}
            </h2>
            <p>Loại: {item.idCategory.categoriesName}</p>
            <h1 className="price-product">Giá: {item.price}</h1>
            <p>
              Số lượng: {item.storage} {item.unit}
            </p>
            <Button
              className="btn-detail"
              onClick={() => {
                moveToProduct(RemoveAccents(item.productName).split(" ").join(""));
              }}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
