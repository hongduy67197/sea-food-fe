import { React, useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;


// truyền props để render giao diện

const HomeFilter = (props) => {

  const handleChange = (value) => {
    props.setSort(value)
    // console.log(value);
  };


  return (
    <>
      <Select
        defaultValue="Xếp Theo Nổi Bật"
        style={{
          width: 160,
        }}
        onChange={handleChange}
      >
        <Option  value={-1}> Giá cao đến thấp </Option>
        <Option value={1}> Giá thấp đến cao </Option>
      </Select>

    </>
  )
}

export default HomeFilter