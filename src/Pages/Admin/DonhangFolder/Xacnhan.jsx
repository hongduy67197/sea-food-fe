// ------------------------------------------------------------------------------------
import { ConsoleSqlOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { valHooks } from "jquery";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { getApi, putApi } from "../../../api/config";
import { getUserCookie } from "../../../refreshToken";
import Header from "../../../Components/Header/header";
import "./styleXacnhan.css";
let data = [
  {
    key: "---------------",
    name: "---------------",
    age: "---------------",
    address: "---------------",
  },
];

function Xacnhan() {
  const [count, setCount] = useState(0);
  const data1 = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const [data2, setReset] = useState(data1);
  useEffect(() => {
    async function getAllorder() {
      let token = getUserCookie("user");
      try {
        const res = await getApi("/admin/order/filter-order?status=pending");
        let arrayCall = res.data;
        const newarray = [];
        arrayCall.map((val, index) => {
          let a = val.listProduct;
          let b;
          if (a.length > 0) {
            b = a.map((value) => {
              return value.idProduct.productName;
            });
            b = new Set(b);
            b = Array.from(b).join(",");
          } else {
            b = "không có data";
          }
          newarray.push({
            key: index + 1,
            stt: index + 1,
            total: val.total ? val.total : 0,
            date: val.updatedAt, 
            name: val.idUser
              ? val.idUser.username == "" || val.idUser.username == undefined
                ? "---------"
                : val.idUser.username
              : "----------",
            age: val.phone ? val.phone : "----------",
            address: val.address ? val.address : "-----------",
            products: b,
            status: val.status,
            _id: val._id,
          });
          return val;
        });
        setReset(newarray);
        data = newarray;
      } catch (error) {
        console.log(168, error);
      }
    }
    getAllorder();
  }, [count]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="large"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="large"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="large"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  async function updateOrderStatus(record) {
    try {
      const status = document.querySelector("#select-pending-status").value;
      await putApi(`/admin/order/${record._id}`, { status });
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "100%",
      ...getColumnSearchProps("stt"),
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.age.length - b.age.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      width: "20%",
      ...getColumnSearchProps("products"),
      sorter: (a, b) => a.products.length - b.products.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Order value",
      dataIndex: "total",
      key: "total",
      width: "10%",
      ...getColumnSearchProps("total"),
      sorter: (a, b) => a.total - b.total,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Order date",
      dataIndex: "date",
      key: "date",
      width: "10%",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => {
        if (a > b) return -1;
      },
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <select
          name=""
          id="select-pending-status"
          onChange={() => {
            updateOrderStatus(record);
          }}
        >
          <option value="pending">pending</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>
      ),
    },
  ];

  return (
    <>
      <Header></Header>
      <div className="table_xacnhan">
        <Table
          columns={columns}
          dataSource={data2}
          pagination={{ defaultPageSize: 300 }}
        />
      </div>
    </>
  );
}
export default Xacnhan;
