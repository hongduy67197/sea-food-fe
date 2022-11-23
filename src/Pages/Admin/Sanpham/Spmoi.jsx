import axios from 'axios';
import React from 'react';
import Header from '../../../Components/Header/header';
import './khohangchinhsua.css';
import { useState, useEffect } from 'react';
import './product.css';
import { getApi, postApi } from '../../../api/config';
import { toast } from 'react-toastify';

function Spmoi(props) {
    const [count, setcount] = useState(1);
    const [product, setproduct] = useState([]);

    useEffect(() => {
        getApi('/admin/categories')
            .then(function (response) {
                console.log(29, response);
                setproduct(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [count]);

    function clearallcode() {
        const form = document.querySelector('.category-add-form');
        form.reset();
        document.querySelector('.category-name-add-input').value = '';
    }
    function clearlist() {
        const form = document.querySelector('.formlist');
        form.reset();
    }
    function addnewcode() {
        const form = document.querySelector('form');
        const formData = new FormData(form);

        postApi('/admin/categories', formData)
            .then(function (response) {
                setcount(count + 1);
                if(response.name === "AxiosError"){
                    return toast.error('Thêm phân loại thất bại', {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                }
                console.log(52, response)
                toast.info('Đã thêm phân loại', {
                    position: 'top-center',
                    autoClose: 3000,
                });
                clearallcode();
            })
            .catch(function (error) {
                console.log(60, error)
                toast.error('Thêm phân loại thất bại', {
                    position: 'top-center',
                    autoClose: 3000,
                });
                console.log(error);
            });
    }
    function newcodeon() {
        document.querySelector('.addnewproductcode').style.display = 'block';
        document.querySelector('.addnewproductlist').style.display = 'none';
        document.querySelector('.addnewvoucher').style.display = 'none';
        document.querySelector('.addnewslide').style.display = 'none';
        document.querySelector('.dongmoi').style.borderRadius = 'unset';
        document.querySelector('.dongmoi').style.height = '75px';
        document.querySelector('.dongmoi').style.background = 'white';
        document.querySelector('.dongmoi').style.borderTopRightRadius = '15px';
        document.querySelector('.dongmoi').style.borderTopLeftRadius = '15px';
        document.querySelector('.dtmoi').style.background = 'white';
        document.querySelector('.dtmoi').style.height = '60px';
        document.querySelector('.dtmoi').style.borderRadius = '15px';
        document.querySelector('.voumoi').style.background = 'white';
        document.querySelector('.voumoi').style.height = '60px';
        document.querySelector('.voumoi').style.borderRadius = '15px';
    }
    function newliston() {
        document.querySelector('.addnewproductlist').style.display = 'block';
        document.querySelector('.addnewproductcode').style.display = 'none';
        document.querySelector('.addnewslide').style.display = 'none';
        document.querySelector('.addnewvoucher').style.display = 'none';
        document.querySelector('.dtmoi').style.borderRadius = 'unset';
        document.querySelector('.dtmoi').style.height = '75px';
        document.querySelector('.dtmoi').style.background = 'white';
        document.querySelector('.dtmoi').style.borderTopRightRadius = '15px';
        document.querySelector('.dtmoi').style.borderTopLeftRadius = '15px';
        document.querySelector('.dongmoi').style.background = 'white';
        document.querySelector('.dongmoi').style.height = '60px';
        document.querySelector('.dongmoi').style.borderRadius = '15px';
        document.querySelector('.voumoi').style.background = 'white';
        document.querySelector('.voumoi').style.height = '60px';
        document.querySelector('.voumoi').style.borderRadius = '15px';
    }
    function addnewlist() {
        setcount(1);
        const form12 = document.querySelector('.formlist');
        const formData12 = new FormData(form12);
        postApi('/admin/product', formData12)
            .then(function (response) {
                if(response.name === "AxiosError"){
                    return toast.error('Thêm sản phẩm thất bại', {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                }
                toast.info('Đã thêm sản phẩm', {
                    position: 'top-center',
                    autoClose: 3000,
                });
                clearlist()
            })
            .catch(function (error) {
                toast.error('Thêm sản phẩm thất bại', {
                    position: 'top-center',
                    autoClose: 3000,
                });
                console.log(error);
            });
    }

    return (
        <div>
            <Header></Header>
            <div className="spmoi">
                <div className="butadd">
                    <button className="dongmoi but" onClick={newcodeon}>
                        Phân loại mới
                    </button>
                    <button className="dtmoi but" onClick={newliston}>
                        Sản phẩm mới
                    </button>
                </div>
                <div className="addnewproductcode">
                    <form className="form category-add-form" action="" encType="multipart/form-data">
                        <span>
                            Tên Phân loại:
                            <input className="productName category-name-add-input" placeholder="Tên phân loại" name="categoriesName" type="text" />
                        </span>
                        <span>
                            Hình ảnh:
                            <input type="file" name="thumpNail" id="" className='category-add-thumb'/>
                        </span>
                    </form>
                    <div className="addbut">
                        <button onClick={addnewcode}>Add new</button>
                        <button onClick={clearallcode}>Clear all</button>
                    </div>
                </div>
                <div className="addnewproductlist">
                    <form className="formlist" action="" encType="multipart/form-data">
                        <span>
                            Tên sản phẩm:
                            <input className="productName" placeholder="Tên sản phẩm" name="productName" type="text" />
                        </span>
                        <span>
                            Phân loại:
                            <select className="option" name="idCategory">
                                {product.map(function (value, index) {
                                    return (
                                        <option key={index} value={value._id}>
                                            {value.categoriesName}
                                        </option>
                                    );
                                })}
                            </select>
                        </span>
                        <span>
                            Đơn giá:
                            <input className="pricevinh" placeholder="Đơn giá" name="price" type="number" />
                        </span>
                        <span>
                            Số lượng:
                            <input className="storage" name="storage" placeholder="Số lượng" type="number" />
                        </span>
                        <span>
                            Đơn vị tính:
                            <input className="storage unit" name="unit" placeholder="Đơn vị" type="text" />
                        </span>
                        <span>
                            Hình ảnh:
                            <input className="productPic" placeholder="Hình ảnh" name="productPic" type="file" />
                        </span>
                    </form>
                    <div className="addbut">
                        <button onClick={addnewlist}>Add new</button>
                        <button onClick={clearlist}>Clear all</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Spmoi;
