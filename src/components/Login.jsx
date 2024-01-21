
import { Navigation, Pagination ,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import mySvg from './../assets/images/logo.svg';

import carousel01 from './../assets/images/carousel01.png';
import carousel02 from './../assets/images/carousel02.png';
import carousel03 from './../assets/images/carousel03.png';




const Login = () =>{

    return(
        <div className="h-screen flex">
                <div className="flex flex-1 flex-col  items-center justify-center bg-white ">
                        <img className="mb-4"src={mySvg} alt="My svg Image"></img>
                        <div className="mb-4"><span>Connecting Stories That Matter</span></div>
                        <div><button className="px-[125px] py-[20px] bg-green-login hover:bg-green-hoverLogin text-white font-bold  rounded-[16px] mb-[25px]">使用Spotify帳號登入</button></div>    
                        <div>沒有帳號嗎？<a className="underline" href="https://www.spotify.com/hk-zh/signup">註冊帳號</a></div>                

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
                                <img className="w-[250px] mb-6" src={carousel01} />
                                <div className="text-[42px] mb-6">鼓舞人心的故事</div>
                                <p className="text-[16px]">從非凡的人生故事和成功經歷中獲得靈感</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-full  pt-[103px]  flex flex-col items-center bg-carousel02 text-white">
                                <img className="w-[250px] mb-6" src={carousel02}/>
                                <div className="text-[42px] mb-6">輕鬆分類與管理</div>
                                    <p className="text-[16px]">一目了然的分類，讓收藏的Podcast保持整潔</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-full pt-[103px] flex flex-col items-center bg-carousel03 text-white">
                                <img className="w-[250px] mb-6" src={carousel03}/>
                                <div className="text-[42px] mb-6">Spotify 快速同步</div>
                                    <p className="text-[16px]">透過Spotify登入，即刻同步您的收藏，隨時隨地收聽</p>
                            </div>
                        </SwiperSlide>
                        {/* 添加更多轮播项 */}
                        </Swiper>
        </div>
    )
}
/* ALPHA Cast */

export default Login;