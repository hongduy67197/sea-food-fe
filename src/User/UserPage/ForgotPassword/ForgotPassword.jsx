
import React from 'react'
import './Forgot.css'
import logo from "../../../assets/images/shopee.png";
import back from "../../../assets/images/back.jpg";
import { postApi, getApi } from "../../../api/config";
import { Link } from 'react-router-dom'


function ForgotPassword(){
 async function next_email(){
   let email = document.querySelector('.forgot_conter_input').value
   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(email===''){
      document.querySelector('.forgot_test_email').innerHTML='Vui lòng điền Email'
   }else if(!filter.test(email)){
      document.querySelector('.forgot_test_email').innerHTML=' Email không đúng định dạng'
   }else{
     const res = await getApi('/user/CheckMail/checkCode',{email:email})
     console.log(20,res,email)
   }
   }
function resetText(){
   document.querySelector('.forgot_test_email').innerHTML = ''
}
 return(
     <>
         <div className = 'forgot_header'>
            <Link to='/'>
                  <img src={logo} alt="img" className = ' forgot_header_imager' style={{ width: "auto" }} />
            </Link>
            <span className='forgot_header_text'>Đặt lại mật khẩu</span>
            <a href="" className='forgot_header_a'>Bạn cần giup đỡ ?</a>
         </div>
         <div className="forgot_conter">
            <div className= 'forgot_conter_modal'>
               <Link to='/user/UserLogin'>
                  <i className="fa-solid fa-arrow-left forgot_back"></i>
               </Link>
                 <span className='forgot_conter_text'>Đặt lại mật khẩu</span>
                 <input type="text" className='forgot_conter_input' placeholder='Nhập Email' onClick={resetText}/>
                 <span className='forgot_test_email'></span>
                 <button className='forgot_conter_button' onClick={next_email}>Tiếp theo</button>
            </div>
         </div>

            
           
     </>
)
}
export default ForgotPassword