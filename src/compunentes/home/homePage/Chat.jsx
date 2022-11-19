
import { React, useEffect, useState } from 'react';
import { WechatOutlined, ThunderboltFilled } from "@ant-design/icons";
import { Avatar, Modal, Button, Comment, Form, Input, List, Select } from 'antd';
import moment from 'moment';
import "./chat.css"

const { Option } = Select;

const chat = () => {
    const info = () => {
        Modal.info({
            content: (
                <>
                    <div className='chat-info'>
                        <div className="chat-icon">
                            <img src="https://livehelp.tgdd.vn/var/botphoto/2021y/07/12/4/0a0b3d8406e211ac580e8dd370ee7a99.jpg" alt="" />
                            <span>
                                Xin chào mừng quý khách đến với hỗ trợ trực tuyến!</span>
                        </div>
                    </div>
                    <div className="chat-select">
                        <p>Quý khách xưng hô là:*</p>
                        <Select
                            defaultValue="Chọn cách xưng hô với quý khách"
                            style={{
                                width: 310,
                            }}

                        >
                            <Option value={1}> Anh </Option>
                            <Option value={-1}> Chị </Option>
                        </Select>
                        <p>Tên của quý khách là:*</p>
                        <input className='chat-vocative' type="text" />
                        <p>Số điện thoại của quý khách là:*</p>
                        <input className='chat-vocative' type="number" />
                        <p className='chat-select-nodemy'><input type="checkbox" />
                            <span>Bằng việc chọn Bắt đầu chat, quý khách đã đồng ý với các Điều khoản của <a href="https://www.nodemy.vn/">Nodemy.vn</a></span></p>
                        <button>Bắt đầu chat</button>
                    </div>
                </>
            ),

            onOk() { },
        });
    };

    return (
        <div className="form-chat">

            <div className="home_status_container-chat">
                <i title="New messages" id="unread-msg-number" className='messages-bnt' onClick={info}>
                    <WechatOutlined className="WechatOutlined" />
                    <a href="#" id="status-icon"></a>
                </i>
            </div>

        </div>
    )
}

export default chat