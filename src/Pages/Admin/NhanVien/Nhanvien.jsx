import React, { useState } from "react";
import Header from "../../../Components/Header/header";
import { Table } from "antd";
import { Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect } from "react";
import { getApi, putApi, deleteApi } from "../../../api/config";
import "./style.css";
import { getUserCookie, refreshToken } from "../../../refreshToken";
import { useSelector } from "react-redux";

function Nhanvien(props) {
  const [state, setstate] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isindex, setIsIndex] = useState(0);
  const [isin, setIsin] = useState(1);
  const userInfor = useSelector(function(state){
    return state.user
  })
  const data = [];

  function count() {
    setIsin(isin + 1);
  }

  const showModal = (id) => {
    setIsIndex(id);
    setIsModalVisible(true);
    data.map(function (val) {
      if (val._id == id) {
        document.querySelector(".role").value = val.role;
      }
    });
    count();
  };

  const handleOk = () => {
    let role = document.querySelector(".role").value;
    if (role !== "") {
      async function getAllorder() {
        let token = getUserCookie("user");
        try {
          const res = await putApi(`/admin/user/${isindex}`, {
            role: role,
          });
          count();
          setIsModalVisible(false);
        } catch (error) {
          console.log(168, error);
        }
      }
      getAllorder();
    } else {
      document.querySelector(".Not").innerHTML = "Vui lòng không được để trống";
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
    },
    {
      title: "Ảnh",
      align: "center",
      dataIndex: "avatar",
      render: (avatar) => (
        <img src={avatar.startsWith('http') ? avatar : process.env.REACT_APP_SEA_FOOD_URL + avatar} alt="anh" />
      ),
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "username",
      sorter: {
        compare: (a, b) => a.username.localeCompare(b.username),
      },
    },
    { title: "Email", dataIndex: "email", align: "center" },
    {
      title: "Địa chỉ",
      align: "center",
      dataIndex: "address",
      sorter: {
        compare: (a, b) => a.address.localeCompare(b.address),
      },
    },
    { title: "Số điện thoại", dataIndex: "phone", align: "center" },
    { title: "Quyền", dataIndex: "role", align: "center" },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      key: "x",
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => {
              showModal(record._id);
            }}
            hidden={userInfor.role !== 'admin'}
            style={{ fontSize: 20 }}
          />
        </>
      ),
    },
  ];

  for (let i = 0; i < state.length; i++) {
    data.push({
      index: i + 1,
      _id: state[i]._id,
      avatar: state[i].avatar,
      username: state[i].username,
      email: state[i].email,
      address: state[i].address,
      phone: state[i].phone,
      role: state[i].role,
    });
  }

  useEffect(() => {
    async function getAllUser() {
      let token = getUserCookie("user");
      try {
        const res = await getApi("/admin/user");
        setstate(res.data);
      } catch (error) {
        console.log(168, error);
      }
    }
    getAllUser();
  }, [isin]);

  function onChange(pagination, filters, sorter, extra) {
  }

  return (
    <div>
      <Header tenname={props.name}></Header>
      <div className="table_nv">
        <h2 className="title_nv">Nhân Viên</h2>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          className="nv"
        />
      </div>
      <Modal
        title="Quản lý nhân Viên"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <select placeholder="quyền" className="role" name="role" > 
          <option value="user">user</option>
          <option value="staff">staff</option>
        </select>
        <p className="Not"></p>
      </Modal>
    </div>
  );
}

export default Nhanvien;