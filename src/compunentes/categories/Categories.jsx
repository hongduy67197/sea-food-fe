import { Avatar, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../categories/categories.css";

const Categories = (props) => {
  const { categories } = props;
  const navigate = useNavigate();

  function movePage(param) {
    navigate("/product/filter", { state: { category: param } });
  }
  return (
    <div className="categories">
      {categories?.map((category) => {
        return (
          <div
            style={{ display: "flex", margin: "auto" }}
            onClick={() => {
              movePage(category);
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip
                label={category.categoriesName}
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
              />
            </Box>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
