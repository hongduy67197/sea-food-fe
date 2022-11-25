import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { React, useRef } from "react";
import "../header/header.css";
const Search = (props) => {
  const { filter, changeFilter } = props;
  const productName = useRef("");

  function searchName(e) {
    changeFilter({ ...filter, filter: { ...filter.filter, productName: e.target.value } });
  }
  console.log("productname", productName.current);
  return (
    <form
      className="header_search-input"
      style={{ padding: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        searchName(productName.current);
      }}
    >
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={(e) => (productName.current = e)}
          placeholder="Nhập sản phẩm bạn muốn tìm kiếm ...."
          inputProps={{ "aria-label": "Nhập sản phẩm bạn muốn tìm kiếm ...." }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon
            onClick={() => {
              searchName(productName.current);
            }}
          />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </form>
  );
};

export default Search;
