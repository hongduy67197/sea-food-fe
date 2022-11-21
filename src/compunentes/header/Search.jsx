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
  let setTime;
  const productName = useRef("");

  function searchName(e) {
    changeFilter({ ...filter, filter: { ...filter.filter, productName: e.target.value } });
    console.log("search", e);
    // let getInputSearch = document.querySelector(".header_search-input").value;
    // setSearch(getInputSearch);
    // tempAddToSearchBar = getInputSearch;
    // props.getValue(getInputSearch);
    // clearTimeout(setTime);
    // setTime = setTimeout(() => {
    //   axios
    //     .get(`/user/fillter?productName=${e}`)
    //     .then(function (res) {
    //       let dataSearch = res.data.listProductCode;
    //       if (dataSearch.length > 0) {
    //         setPost(dataSearch);
    //       } else {
    //         setPost([
    //           {
    //             productName: "không có kết quả nào phù hợp, mời bạn nhập lại !!!",
    //           },
    //         ]);
    //       }
    //       clearTimeout(setTime);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       clearTimeout(setTime);
    //     });
    // }, [50]);
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
    console.log(51, e.target.innerHTML);
    navigate(`/product/filter/${linktoProductModify}`);
  }

  // props.getValue(122424234234)
  //   if(tempAddToSearchBar ===0 ){
  //   document.querySelector('.header_search-input').innerHTML= ''
  // }else {
  //   document.querySelector('.header_search-input').innerHTML= tempAddToSearchBar

  // }
  console.log("productname", productName.current);
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
            // onChange={(e) => searchName(e)}
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
