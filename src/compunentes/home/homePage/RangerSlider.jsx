import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React, { useRef, useState } from "react";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const { changeFilter, filter } = props;
  const [value, setValue] = useState([0, 700000]);
  const lowPrice = useRef("");
  const highPrice = useRef("");
  const handleChange = (event, newValue) => {
    console.log("event", newValue[0], newValue[1]);
    lowPrice.current = newValue[0];
    highPrice.current = newValue[1];
    setValue(newValue);
  };
  const marks = [
    {
      value: 0,
      label: "0 VND",
    },

    {
      value: 700000,
      label: "700.000 VND",
    },
  ];

  return (
    <>
      <Box sx={{ width: "90%", margin: "auto" }}>
        <Slider
          aria-labelledby="input-slider"
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
          step={10000}
          min={0}
          max={700000}
        />
      </Box>
      <Button
        variant="contained"
        style={{ width: "100%" }}
        onClick={() => {
          changeFilter({
            ...filter,
            filter: { ...filter.filter, high: highPrice.current, low: lowPrice.current },
          });
        }}
      >
        Tìm kiếm
      </Button>
    </>
  );
}
