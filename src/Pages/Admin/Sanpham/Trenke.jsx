import Header from "../../../Components/Header/header";
import "./product.css";
import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserCookie, refreshToken } from "../../../refreshToken";
import { getApi, putApi, deleteApi } from "../../../api/config";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";

var vitriup;
var masoup;

function Trenke(props) {
  const initFilter = {
    filter: {
      productName: "",
      idCategory: "",
      high: 1000000,
      low: 0,
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
  };
  const [filter, setFilterProduct] = useState(initFilter);
  const [data, setdata] = useState([]);
  const [category, setCategory] = useState([]);
  const [sign, setsign] = useState(1);
  const [pageNumber, setPageNumber] = useState(0)
  function changeFilter(data) {
    setFilterProduct({ ...data });
  }
  useEffect(() => {
    async function getAllUser() {
      const page = (filter && filter?.pagination?.page) || "";
      const pageSize = (filter && filter?.pagination?.pageSize) || "";
      let token = getUserCookie("user");
      try {
        const res = await getApi("/admin/product/list");
        const res1 = await getApi(`/admin/product/filter?page=${page}&pageSize=${pageSize}`);
        const newPageNumber = Math.ceil(res1.data.total/pageSize);
        setPageNumber(newPageNumber);
        setdata(res1.data.filter);
        const categories = await getApi("admin/categories");
        setCategory(categories.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUser();
  }, [sign, filter]);
  // ket thuc


  function onupdate(id, index) {
    vitriup = index;
    masoup = id;
    document.querySelector(".boxfix").style.display = "block";
    getApi(`/admin/product/${id}`)
      .then(function (response) {
        document.querySelector(".productName").value =
          response.data.productName;
        document.querySelector(".pricevinh").value = response.data.price;
        document.querySelector(".storage").value = response.data.storage;
        document.querySelector(".product-update-unit").value =
          response.data.unit;
        document.querySelector(".form-product-list-category").value =
          response.data.idCategory._id;
        document.querySelector("#isActive").checked = response.data.isActive;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function closeupdate() {
    document.querySelector(".boxfix").style.display = "none";
  }

  async function update() {
    const form = document.querySelector("#form-product-update");
    const formData = new FormData(form);
    const isActive = document.querySelector("#isActive").checked;
    formData.set("isActive", isActive);
    try {
      let response = await putApi(`/admin/product/${masoup}`, formData);
      if (response.name === "AxiosError") {
        return toast.error("Update thất bại", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      toast.info("Update thành công", {
        position: "top-center",
        autoClose: 3000,
      });
      closeupdate();
      setsign(sign + 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header></Header>
      <div className="newproduct">
        <div className="boxtable">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Active</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {data.map(function (value, index) {
                return (
                  <tr className="codehover" key={index}>
                    <td>{index + 1}</td>
                    <td>{value.productName}</td>
                    <td>
                      <img
                        src={
                          process.env.REACT_APP_SEA_FOOD_URL + value.productPic
                        }
                        alt=""
                      />
                    </td>
                    <td>{value.storage}</td>
                    <td>{`${value.isActive}`}</td>
                    <td>
                      <button
                        style={{ margin: "0px 5px" }}
                        onClick={() => onupdate(value._id, index)}
                        className="stockbut"
                      >
                        <i className="fa-solid fa-repeat"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Stack
            direction="row-reverse"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Pagination
              count={pageNumber}
              color="primary"
              onChange={(e, page) => {
                changeFilter({
                  ...filter,
                  pagination: { ...filter.pagination, page: page },
                });
              }}
            />
          </Stack>
        </div>
        <div className="boxfix">
          <h3>Bảng thông tin chỉnh sửa</h3>
          <form id="form-product-update" action="">
            <div className="inboxfix">
              <span>productName:</span>{" "}
              <input className="productName" type="text" name="productName" />
            </div>
            <div className="inboxfix">
              <span>price:</span>{" "}
              <input className="pricevinh" type="text" name="price" />
            </div>
            <div className="inboxfix">
              <span>storage:</span>{" "}
              <input className="storage" type="text" name="storage" />
            </div>
            <div className="inboxfix">
              <span>unit:</span>{" "}
              <input
                className="storage product-update-unit"
                type="text"
                name="unit"
              />
            </div>
            <div className="inboxfix">
              <span>active:</span>
              <input
                id="isActive"
                className="storage"
                type="checkbox"
                name="isActive"
              />
            </div>
            <div className="inboxfix">
              <span>category:</span>
              <select
                className="form-product-list-category"
                name="idCategory"
                id=""
              >
                {category.map((ele, index) => {
                  return (
                    <option value={ele._id} key={index}>
                      {ele.categoriesName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="inboxfix">
              <span>thumbNail:</span>{" "}
              <input className="storage" type="file" name="productPic" />
            </div>
          </form>
          <div className="boxfixbut">
            <button onClick={update}>Update</button>
            <button onClick={closeupdate}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trenke;
