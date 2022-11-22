import { SearchOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { React, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header/header.css";
import SearchIcon from "@mui/icons-material/Search";
let tempAddToSearchBar;

const Search = (props) => {
  const { filter, changeFilter } = props;
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const productName = useRef("");

  function searchName(e) {
    changeFilter({ ...filter, filter: { ...filter.filter, productName: e.target.value } });
  }
  const navigate = useNavigate();
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
  function movePageToProduct(e) {
    let linktoProduct = e.target.innerHTML;
    let linktoProductModify = RemoveAccents(linktoProduct).split(" ").join("");
    navigate(`/product/filter/${linktoProductModify}`);
  }
  return (
    <div className="header_search-input-wrap">
      <div style={{ display: "flex" }}>
        <form
          className="header_search-input"
          style={{ padding: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            searchName(productName.current);
          }}
        >
          <input
            type="text"
            name=""
            className="header_search-input"
            placeholder="Nhập vào từ khóa muốn tìm kiếm ... "
            onChange={(e) => (productName.current = e)}
          />
        </form>

        <IconButton
          color="primary"
          aria-label="Search"
          component="label"
          onClick={() => {
            searchName(productName.current);
          }}
        >
          <SearchIcon
            onClick={() => {
              searchName(productName.current);
            }}
          />
        </IconButton>
      </div>
      <div
        className="header_search-history"
        style={search ? { display: "inline-block" } : { display: "none" }}
      >
        <h3 className="header_search-history-heading">
          <ul className="header_search-history-heading-text-list">
            {post.length > 0 ? (
              post.map((val) => {
                return (
                  <li
                    onClick={(e) => {
                      movePageToProduct(e);
                    }}
                    className="header_search-history-heading-text-list-item"
                  >
                    {val.productName}
                  </li>
                );
              })
            ) : (
              <li
                onClick={(e) => {
                  movePageToProduct(e);
                }}
                className="header_search-history-heading-text-list-item"
              ></li>
            )}
          </ul>
        </h3>
      </div>
    </div>
  );
};

export default Search;
