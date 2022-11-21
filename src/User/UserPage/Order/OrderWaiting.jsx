import React from "react";
import order from "../../../assets/images/ordermenu.png";

function OrderWaiting(props) {
  const allOrder = props.userOder
  let sumOrder = []
  let sumStatus=0
for(let a = 0; a < allOrder.length; a++){
  if(allOrder[a].status !== props.status){
    continue;
  }
  
  let list = allOrder[a].listProduct
  sumStatus = allOrder[a].status
  sumOrder=[...sumOrder,...list]
}

console.log(14, sumOrder);
  return (
    <div>
      <div className="order_seach">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản Phẩm"
        />
      </div>
      {sumOrder?
     ( <table>
       <thead>
        <tr>
          <th>STT</th>
          <th>Sản phẩm</th>
          <th>avatar</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>status</th>
        </tr>
       </thead>
       <tbody>
        {sumOrder.map(function(value, index){
          console.log(38, value)
            if(value.idProduct !== null){
          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{value.idProduct.productName}</td>
              <td><img src={process.env.REACT_APP_SEA_FOOD_URL+value.idProduct.productPic[0]} alt="img" className="order_conter_img"/></td>
              <td>{(value.idProduct.price)}</td>
              <td>{(value.quantity)}</td>
              <td>{sumStatus}</td>
            </tr>
          )}
         
        })}
       </tbody>
        </table>):
     ( <div className="order_conter">
      <div className="order_conter_null">
        <img src={order} alt="" />
        <p>Chưa có đơn hàng</p>
      </div>
      <div className="order_conter_file"></div>
    </div>
    )
    }
  </div>
  );}

export default OrderWaiting;
