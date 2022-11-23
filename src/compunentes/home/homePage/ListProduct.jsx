import { React } from "react";
import Cards from "../homePage/Cards";
import "../homePage/ListProduct.css";

const ListProduct = (items) => {
  return (
    <>
      <div className="Product-list">
        {items.productCode.slice(0, items.numberShow).map((item, index) => {
          return <Cards keyId={index} item={item} icon={items.NewIcon} sort={items.sort} />;
        })}
      </div>
    </>
  );
};

export default ListProduct;
