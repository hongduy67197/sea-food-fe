import { Avatar, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./categories.css";

const Categories_sea = (props) => {
  const { categories, filter, changeFilter } = props;
  const navigate = useNavigate();

  function movePage(param) {
    navigate("/product/filter", { state: { category: param } });
  }
  return (
    <div>
      {categories.map((category) => {
        console.log("category", category);
        return (
          <div
            style={{ width: "100%", margin: "auto" }}
            onClick={() => {
              changeFilter({ ...filter, filter: { ...filter.filter, idCategory: category._id } });
            }}
          >
            <Chip
              label={category.categoriesName}
              // className={}
              avatar={
                <Avatar style={{ width: "40px", height: "40px", background: "white" }}>
                  <img
                    className="categories_icon"
                    src={process.env.REACT_APP_SEA_FOOD_URL + category.thumpNail}
                  />
                </Avatar>
              }
              clickable
              variant="outlined"
              style={{ height: "50px", margin: "3px", width: "100%" }}
              // onDelete={}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Categories_sea;
