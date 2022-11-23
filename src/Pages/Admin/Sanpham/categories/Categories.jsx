import { Avatar, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../categories/categories.css";

const Categories_sea = (props) => {
  const { categories, filter, changeFilter } = props;
  const navigate = useNavigate();

  function movePage(param) {
    navigate("/product/filter", { state: { category: param } });
  }
  return (
    <div className="categories">
      {categories.map((category) => {
        console.log("category", category);
        return (
          <div
            style={{ display: "flex", margin: "auto" }}
            onClick={() => {
              changeFilter({ ...filter, filter: { ...filter.filter, idCategory: category._id } });
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip
                label={category.categoriesName}
                // className={}
                avatar={
                  <Avatar>
                    <img
                      className="categories_icon"
                      src={process.env.REACT_APP_SEA_FOOD_URL + category.thumpNail}
                    />
                  </Avatar>
                }
                clickable
                color="primary"
                // onDelete={}
              />
            </Box>
          </div>
          // <Tooltip title={categories.categoriesName} style={{ border: "none" }}>
          //   <div>
          //     <img
          //     className="categories-img"
          //     src={process.env.REACT_APP_SEA_FOOD_URL + category.thumpNail}
          //   />
          //   </div>

          // </Tooltip>
        );
      })}
    </div>
  );
};

export default Categories_sea;
