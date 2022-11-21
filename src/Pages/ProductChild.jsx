import React, { useEffect, useState } from "react";
import "../App.css";
import "../asset/css/base-productChild.css";
import Header from "../compunentes/header/Header";
import Footer from "../compunentes/footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { getApi, patchApi } from "../api/config";
import { useNavigate } from "react-router-dom";
let countproduct = 1;
function ProductChild(props) {
  const { idProduct } = props;
  // let arrayOrigin = props.dataFilter[props.chimuc].products;
  // const [dem, setDem] = useState(0);
  // const [count, setCount] = useState(countproduct);
  // const [countStorage, setCountStorage] = useState(arrayOrigin[0].storage);
  // const [priceProduct, setPriceProduct] = useState(arrayOrigin[0].price);
  // // ram products
  // let arrayOriginRam = [
  //   ...new Set(
  //     arrayOrigin.map((val) => {
  //       return val.ram;
  //     })
  //   ),
  // ];
  // // rom products]
  // let arrayOriginRom = [
  //   ...new Set(
  //     arrayOrigin.map((val) => {
  //       return val.rom;
  //     })
  //   ),
  // ];
  // const [filterRom, setFilterRom] = useState(arrayOriginRom);

  // // color product
  // let arrayOriginColor = [
  //   ...new Set(
  //     arrayOrigin.map((val) => {
  //       return val.color;
  //     })
  //   ),
  // ];
  // const [filterColor, setFilterColor] = useState(arrayOriginColor);
  // // img product
  // let arrayOriginImg = [];
  // for (let i = 0; i < arrayOrigin.length; i++) {
  //   for (let j = 0; j < arrayOrigin[i].productPic.length; j++) {
  //     arrayOriginImg.push(arrayOrigin[i].productPic[j]);
  //   }
  // }
  // arrayOriginImg = [...new Set(arrayOriginImg)];

  // const [currentIMG, setCurrentIMG] = useState(arrayOriginImg[0]);
  // useEffect(() => {
  //   document.querySelector("#products-ram").classList.add("onButton");
  //   document.querySelector("#products-rom").classList.add("onButton");
  //   document.querySelector("#products-color").classList.add("onButton");
  // }, []);
  // useEffect(() => {
  //   let queryRam = document.querySelectorAll("#products-ram");
  //   for (let i = 0; i < queryRam.length; i++) {
  //     if (queryRam[i].classList.contains("onButton")) {
  //       let valueRam = queryRam[i].innerHTML;
  //       arrayOriginRom = [
  //         ...new Set(
  //           arrayOrigin
  //             .filter((val) => {
  //               return val.ram === valueRam;
  //             })
  //             .map((value) => {
  //               return value.rom;
  //             })
  //         ),
  //       ];
  //       arrayOriginColor = [
  //         ...new Set(
  //           arrayOrigin
  //             .filter((val) => {
  //               return val.ram === valueRam;
  //             })
  //             .map((value) => {
  //               return value.color;
  //             })
  //         ),
  //       ];
  //       setFilterRom(arrayOriginRom);
  //       setFilterColor(arrayOriginColor);
  //     }
  //   }
  // }, [dem]);

  // function increaseCount() {
  //   setCount(count + 1);
  //   setCountStorage(countStorage - 1);
  // }
  // function reduceCount() {
  //   setCount(count - 1);
  //   setCountStorage(countStorage + 1);
  // }
  // function checkExistClass(arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i].classList.contains("onButton")) {
  //       return arr[i];
  //     }
  //   }
  // }
  // function changePriceViaRam(e) {
  //   let listProductRam = document.querySelectorAll("#products-ram");
  //   setDem(dem + 1);
  //   for (let i = 0; i < listProductRam.length; i++) {
  //     listProductRam[i].classList.remove("onButton");
  //   }
  //   e.target.classList.add("onButton");
  //   let listProductRom = document.querySelectorAll("#products-rom");
  //   let listProductColor = document.querySelectorAll("#products-color");
  //   let valueOfFieldRam = checkExistClass(listProductRam).innerHTML;
  //   let valueOfFieldRom = checkExistClass(listProductRom).innerHTML;
  //   let valueOfFieldColor = checkExistClass(listProductColor).innerHTML;
  //   let destinyPrice = arrayOrigin.filter((val, i) => {
  //     return (
  //       val.ram === valueOfFieldRam &&
  //       val.rom === valueOfFieldRom &&
  //       val.color === valueOfFieldColor
  //     );
  //   });
  //   setPriceProduct(destinyPrice[0].price);
  // }
  // function changePriceViaRom(e) {
  //   let listProductRom = document.querySelectorAll("#products-rom");
  //   for (let i = 0; i < listProductRom.length; i++) {
  //     listProductRom[i].classList.remove("onButton");
  //   }
  //   e.target.classList.add("onButton");
  //   let listProductRam = document.querySelectorAll("#products-ram");
  //   let listProductColor = document.querySelectorAll("#products-color");
  //   let valueOfFieldRam = checkExistClass(listProductRam).innerHTML;
  //   let valueOfFieldRom = checkExistClass(listProductRom).innerHTML;
  //   let valueOfFieldColor = checkExistClass(listProductColor).innerHTML;
  //   let destinyPrice = arrayOrigin.filter((val, i) => {
  //     return (
  //       val.ram === valueOfFieldRam &&
  //       val.rom === valueOfFieldRom &&
  //       val.color === valueOfFieldColor
  //     );
  //   });
  //   setPriceProduct(destinyPrice[0].price);
  // }
  // function changePriceViaColor(e) {
  //   let listProductColor = document.querySelectorAll("#products-color");
  //   for (let i = 0; i < listProductColor.length; i++) {
  //     listProductColor[i].classList.remove("onButton");
  //   }
  //   e.target.classList.add("onButton");
  //   let listProductRom = document.querySelectorAll("#products-rom");
  //   let listProductRam = document.querySelectorAll("#products-ram");
  //   let valueOfFieldRam = checkExistClass(listProductRam).innerHTML;
  //   let valueOfFieldRom = checkExistClass(listProductRom).innerHTML;
  //   let valueOfFieldColor = checkExistClass(listProductColor).innerHTML;
  //   let destinyPrice = arrayOrigin.filter((val, i) => {
  //     return (
  //       val.ram === valueOfFieldRam &&
  //       val.rom === valueOfFieldRom &&
  //       val.color === valueOfFieldColor
  //     );
  //   });
  //   setPriceProduct(destinyPrice[0].price);
  // }
  // function changeImageDetail(index) {
  //   setCurrentIMG(arrayOriginImg[index]);
  // }

  // const [quatityCart, setQuatityCart] = useState(0)
  // async function sendCart (){
  //   let countProduct = document.querySelector('.number-plus-subtract').innerHTML*1
  //   // console.log(153,countProduct*1)
  //   // console.log(123,props.dataFilter )
  //   // console.log(152,props.dataFilter[props.chimuc])
  //   let ram = document.getElementsByClassName('onButton')[0].innerHTML
  //   let rom = document.getElementsByClassName('onButton')[1].innerHTML
  //   let color = document.getElementsByClassName('onButton')[2].innerHTML
  //   let productCart = props.dataFilter[props.chimuc].products.filter((val)=>{
  //     console.log(161, ram, rom , color)
  //     return val.color ===color && val.ram ===ram && val.rom === rom;
  //   })[0]._id
  //   // console.log(163,productCart)
  //   // const userid = useSelector(function(state){return state.user})
  //   // console.log(165,userid)
  //   try {
  //     await patchApi('/user/carts/',{
  //       quantity: countProduct,
  //       idProduct:productCart
  //     })
  //     alert('Đã thêm vào giỏ hàng')
  //     const res = await getApi("http://localhost:3150/user/carts")
  //     // console.log(193 ,res.data.listCartsUser[0].listProduct.length)
  //     // console.log(194 ,res)
  //     setQuatityCart(res.data.listCartsUser[0].listProduct.length)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const navigate = useNavigate()
  // async function sendCart2 (){
  //   let countProduct = document.querySelector('.number-plus-subtract').innerHTML*1
  //   // console.log(153,countProduct*1)
  //   // console.log(123,props.dataFilter )
  //   // console.log(152,props.dataFilter[props.chimuc])
  //   let ram = document.getElementsByClassName('onButton')[0].innerHTML
  //   let rom = document.getElementsByClassName('onButton')[1].innerHTML
  //   let color = document.getElementsByClassName('onButton')[2].innerHTML
  //   let productCart = props.dataFilter[props.chimuc].products.filter((val)=>{
  //     // console.log(161, ram, rom , color)
  //     return val.color ===color && val.ram ===ram && val.rom === rom;
  //   })[0]._id
  //   // console.log(163,productCart)
  //   // const userid = useSelector(function(state){return state.user})
  //   // console.log(165,userid)
  //   try {
  //     await patchApi('http://localhost:3150/user/carts/',{
  //       quantity: countProduct,
  //       idProduct:productCart
  //     })
  //     // alert('Đã thêm vào giỏ hàng')
  //     const res = await getApi("http://localhost:3150/user/carts")
  //     // console.log(193 ,res)
  //     setQuatityCart(res.data[0].listProduct.length)
  //     navigate("/Cart");
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  console.log("idProduct", idProduct);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getApi(`/user/product/get-one-product/:${idProduct}`);
        console.log("data_get_id", data);
        // setDataFilter(data.data.listProductList);
        // const categoryRes = await getApi("/user/get-all-category");
        // setCategories(categoryRes.data.categories);
      } catch (error) {
        console.log(39, error);
      }
    }
    getData();
  }, []);

  function addCard(idProduct, quantity) {
    async function pathCard() {
      try {
        const data = await patchApi(`/user/carts/add-to-cart`, { idProduct, quantity });
        console.log("path", data);
        // setDataFilter(data.data.listProductList);
        // const categoryRes = await getApi("/user/get-all-category");
        // setCategories(categoryRes.data.categories);
      } catch (error) {
        console.log(39, error);
      }
    }
    pathCard();
  }
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <input
        type="number"
        onChange={(e) => {
          console.log("numberProduct", e.target.value);
          setQuantity(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addCard(idProduct, quantity);
        }}
      >
        theem vao gio hang
      </button>
    </>
  );
}

export default ProductChild;
