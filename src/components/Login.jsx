
import { Navigation, Pagination ,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import LoginButton from './LoginButton'
import mySvg from './../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import carousel01 from './../assets/images/carousel01.png';
import carousel02 from './../assets/images/carousel02.png';
import carousel03 from './../assets/images/carousel03.png';
//import { useNavigate } from 'react-router-dom';
const Login = () =>{
    const token = localStorage.getItem("accessToken");
    const refresh_token = localStorage.getItem("refreshToken");
    const navigate = useNavigate();
    useEffect(()=>{
        if(token){
            navigate('/home');
        }
    },[])
    return(
        <div className="h-screen flex flex-row justify-center">
                <div className="flex flex-1 flex-col  items-center justify-center bg-white ">
                        <img className="mb-4"src={mySvg} alt="My svg Image"></img>
                        <div className="mb-4"><span>Connecting Stories That Matter</span></div>
                        <LoginButton></LoginButton>
                        <div>沒有帳號嗎？<a to="/home"><span className="underline">註冊帳號</span></a></div>                
                </div>
                    <Swiper className="flex flex-1 bg-carousel03"
                        modules={[Navigation,Pagination,Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay:2000, disableOnInteraction: false }}
                        loop ={true}
                        speed = {1000}
                        >
                        <SwiperSlide>
                            <div className="h-full  pt-[103px] flex flex-col items-center bg-carousel01 text-white">
                                <img className="max-w-[250px] w-full mb-6" src={carousel01} />
                                <div className="text-[42px] mb-6">鼓舞人心的故事</div>
                                <p className="text-[16px]">從非凡的人生故事和成功經歷中獲得靈感</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-full  pt-[103px]  flex flex-col items-center bg-carousel02 text-white">
                                <img className="max-w-[250px] w-full  mb-6" src={carousel02}/>
                                <div className="text-[42px] mb-6">輕鬆分類與管理</div>
                                    <p className="text-[16px]">一目了然的分類，讓收藏的Podcast保持整潔</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-full pt-[103px] flex flex-col items-center bg-carousel03 text-white">
                                <img className="max-w-[250px] w-full mb-6" src={carousel03}/>
                                <div className="text-[42px] mb-6">Spotify 快速同步</div>
                                    <p className="text-[16px]">透過Spotify登入，即刻同步您的收藏，隨時隨地收聽</p>
                            </div>
                        </SwiperSlide>

                        </Swiper>
        </div>
    )
}
/* ALPHA Cast */

export default Login;