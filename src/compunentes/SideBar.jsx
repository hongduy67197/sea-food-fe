import { Avatar, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerticalTabs(props) {
  const { categories, filter, changeFilter } = props;
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "70%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {categories.map((category) => {
          console.log("category", category);
          return (
            <div
              style={{ display: "flex", margin: "auto" }}
              onClick={() => {
                changeFilter({ ...filter, filter: { ...filter.filter, idCategory: category._id } });
              }}
            >
              <Tab label="Item One">
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
              </Tab>
            </div>
          );
        })}
      </Tabs>
    </Box>
  );
}
