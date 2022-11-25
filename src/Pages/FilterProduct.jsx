import { Button, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getApi } from "../api/config";
import "../App.css";
import "../asset/css/base.css";
import "../asset/css/grid.css";
import "../asset/css/main.css";
import "../asset/css/responsive.css";
import Loading from "../component/Loading/Loading";
import Footer from "../compunentes/footer/Footer";
import ListProduct from "../compunentes/home/homePage/ListProduct";
import RangeSlider from "../compunentes/home/homePage/RangerSlider";
import Categories_sea from "./Admin/Sanpham/header/categories/Categories";
import TabPanel from "../compunentes/SideBar";
import Header from "../compunentes/header/Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FilterProduct(props) {
  const location = useLocation();
  const { state } = location;
  const [productCode, setProductCode] = useState([]);
  const [product, setProduct] = useState([]);
  const [numberShow, setNumberShow] = useState(20);
  const [Slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [NewIcon, setNewIcon] = useState([]);
  const [loading, setLoading] = useState(false);

  const initFilter = {
    filter: {
      productName: "",
      idCategory: state?.category?._id || "",
      high: "",
      low: "",
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
  };
  const [filter, setFilterProduct] = useState(initFilter);
  function changeFilter(data) {
    setFilterProduct({ ...data });
  }
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const productName = (filter && filter?.filter?.productName) || "";
      const idCategory = (filter && filter?.filter?.idCategory) || "";
      const high = (filter && filter?.filter?.high) || "";
      const low = (filter && filter?.filter?.low) || "";
      const page = (filter && filter?.pagination?.page) || "";
      const pageSize = (filter && filter?.pagination?.pageSize) || "";
      try {
        const data = await getApi(
          `/user/product/filter?productName=${productName}&idCategory=${idCategory}&page=${page}&pageSize=${pageSize}&high=${high}&low=${low}`
        );
        setProduct(data.data.filter);
        const categoryRes = await getApi("/user/get-all-category");
        setCategories(categoryRes.data.categories);
        setLoading(false);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, [filter]);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    let cloneProductCode = [...productCode]; // tạo productCode clone để không sửa vào data gốc rồi set lại productCode clone
    if (sort === 1) {
      cloneProductCode.sort((after, before) => {
        return after.newPrice - before.newPrice;
      });
    }
    if (sort === -1) {
      cloneProductCode.sort((after, before) => {
        return before.newPrice - after.newPrice;
      });
    }
    setProductCode(cloneProductCode); //set lại productCode khi có đáp ứng đủ điều kiện ( đk được truyền bên select HomeFilter)
  }, [sort]); // truyền sort để lắng nghe thay đổi
  console.log("localtion ", location);

  const [mountCart, setMountCart] = useState(0);
  useEffect(() => {
    console.log("_inAPIcart");
    async function getData() {
      try {
        const data = await getApi(`/user/carts`);
        setMountCart(data.data.cart.listProduct.length);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <Header
        filter={filter}
        changeFilter={(data) => {
          changeFilter(data);
        }}
        categories={categories}
        mountCart={mountCart}
      />

      {loading && <Loading />}
      <div className="home">
        <div className="home-container">
          <div className="home-container-filter">
            <div className="home-page-product">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    {/* <TabPanel
                      filter={filter}
                      categories={categories}
                      changeFilter={(data) => {
                        changeFilter(data);
                      }}
                    /> */}
                    <Categories_sea
                      filter={filter}
                      categories={categories}
                      changeFilter={(data) => {
                        changeFilter(data);
                      }}
                    />
                    <div style={{ marginTop: "30px" }}>
                      <RangeSlider
                        filter={filter}
                        changeFilter={(data) => {
                          changeFilter(data);
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6} md={9}>
                    <ListProduct
                      sort={sort}
                      productCode={product}
                      categories={categories}
                      numberShow={numberShow}
                      NewIcon={NewIcon}
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          {/* Pagination */}
          <div style={{ marginTop: "30px" }}>
            <Stack direction="row-reverse" justifyContent="center" alignItems="center" spacing={2}>
              <Pagination
                count={20}
                color="primary"
                onChange={(e, page) => {
                  changeFilter({ ...filter, pagination: { ...filter.pagination, page: page } });
                }}
              />
            </Stack>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default FilterProduct;
