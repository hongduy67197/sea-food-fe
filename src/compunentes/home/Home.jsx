import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import { React, useEffect, useState } from "react";
import { getApi } from "../../api/config";
import Loading from "../../component/Loading/Loading";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "../home/Home.css";
import ListProduct from "./homePage/ListProduct";

const Home = () => {
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
      idCategory: "",
      high: 1000000,
      low: 0,
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
    let cloneProductCode = [...productCode]; 
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
    setProductCode(cloneProductCode); 
  }, [sort]); 
  return (
    <>
      <Header
        filter={filter}
        changeFilter={(data) => {
          changeFilter(data);
        }}
        categories={categories}
      />
      {loading && <Loading />}
      <div className="home">
        <div className="home-container">
          <div className="home-container-filter">
            <div className="home-page-product">
              <ListProduct
                sort={sort}
                productCode={product}
                categories={categories}
                numberShow={numberShow}
                NewIcon={NewIcon}
              />
            </div>
          </div>
          {/* Pagination */}
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

      <Footer />
    </>
  );
};

export default Home;
