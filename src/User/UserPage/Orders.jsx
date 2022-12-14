import React, { useEffect, useState } from 'react';
import OrderAll from "./Order/OrderAll";
import OrderCheck from "./Order/OrderCheck";
import OrderDaGiao from "./Order/OrderDaGiao";
import OrderDaHuy from "./Order/OrderDaHuy";
import OrderDangGiao from "./Order/OrderDangGiao";
import OrderWaiting from "./Order/OrderWaiting";
import "./OrderCss.css";
import {getApi} from '../../api/config'


function Orders(props) {
  const [userCart,setUserCart]=useState([])

 const [userOder, setUserOder]=useState([])
useEffect(() => {
  getApi('/user/carts')
  .then(function(data){
    const newCart =data.data.cart.listProduct 
    setUserCart(newCart)
  })
 .catch(function(orr){
  console.log(34,orr)
  })
}, [])

useEffect(() => {
  getApi("/user/orders")
    .then((data) => {
      const dataOder =data.data
      setUserOder(dataOder)
    })
    .catch((err) => {
      console.log(43,err);
    });
}, []);
  function onofAll() {
    document.querySelector(".orderAll").style.display = "block";
    document.querySelector(".orderCheck").style.display = "none";
    document.querySelector(".orderDaGiao").style.display = "none";
    document.querySelector(".orderWaiting").style.display = "none";
    document.querySelector(".orderDaHuy").style.display = "none";
    document.querySelector(".orderDangGiao").style.display = "none";
  }
  function onofCheck() {
    document.querySelector(".orderAll").style.display = "none";
    document.querySelector(".orderCheck").style.display = "block";
    document.querySelector(".orderDaGiao").style.display = "none";
    document.querySelector(".orderWaiting").style.display = "none";
    document.querySelector(".orderDaHuy").style.display = "none";
    document.querySelector(".orderDangGiao").style.display = "none";
  }
  function onofDaGiao() {
    document.querySelector(".orderAll").style.display = "none";
    document.querySelector(".orderCheck").style.display = "none";
    document.querySelector(".orderDaGiao").style.display = "block";
    document.querySelector(".orderWaiting").style.display = "none";
    document.querySelector(".orderDaHuy").style.display = "none";
    document.querySelector(".orderDangGiao").style.display = "none";
  }
  function onofWaiting() {
    document.querySelector(".orderAll").style.display = "none";
    document.querySelector(".orderCheck").style.display = "none";
    document.querySelector(".orderDaGiao").style.display = "none";
    document.querySelector(".orderWaiting").style.display = "block";
    document.querySelector(".orderDaHuy").style.display = "none";
    document.querySelector(".orderDangGiao").style.display = "none";
  }
  function onofDangGiao() {
    document.querySelector(".orderAll").style.display = "none";
    document.querySelector(".orderCheck").style.display = "none";
    document.querySelector(".orderDaGiao").style.display = "none";
    document.querySelector(".orderWaiting").style.display = "none";
    document.querySelector(".orderDaHuy").style.display = "none";
    document.querySelector(".orderDangGiao").style.display = "block";
  }
  function onofDaHuy() {
    document.querySelector(".orderAll").style.display = "none";
    document.querySelector(".orderCheck").style.display = "none";
    document.querySelector(".orderDaGiao").style.display = "none";
    document.querySelector(".orderWaiting").style.display = "none";
    document.querySelector(".orderDaHuy").style.display = "block";
    document.querySelector(".orderDangGiao").style.display = "none";
  }

  console.log(87, userOder)
  return (
    <div>
      <div className="order_header">
        <button onClick={onofAll}>T???t c???</button>
        <button onClick={onofCheck}>Ch??? x??c nh???n</button>
        {/* <button onClick={onofWaiting}>Ch??? l???y h??ng</button> */}
        <button onClick={onofDangGiao}>??ang giao</button>
        <button onClick={onofDaGiao}>???? giao</button>
        {/* <button onClick={onofDaHuy}>???? h???y </button> */}
      </div>
      <div className="orderAll">
        <OrderAll userCart={userCart} userOder={userOder}></OrderAll>
      </div>
      <div className="orderCheck">
        <OrderCheck setUserCart={setUserCart} userOder={userOder} userCart={userCart} status='pending'></OrderCheck>
      </div>
      <div className="orderDaGiao">
        <OrderDaGiao setUserCart={setUserCart} userOder={userOder} userCart={userCart} status='done'></OrderDaGiao>
      </div>
      <div className="orderWaiting">
        <OrderWaiting setUserCart={setUserCart} userOder={userOder} userCart={userCart} status='pending'></OrderWaiting>
      </div>
      <div className="orderDangGiao">
        <OrderDangGiao setUserCart={setUserCart} userOder={userOder} userCart={userCart} status='doing'></OrderDangGiao>
      </div>
      <div className="orderDaHuy">
        <OrderDaHuy setUserCart={setUserCart} userOder={userOder} userCart={userCart} status='cancel'></OrderDaHuy>
      </div>
    </div>
  );
}

export default Orders;
