
import { Navigation, Pagination ,Autoplay,Scrollbar } from 'swiper/modules';
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
import orangesodacast from './../assets/images/orangesoda-cast.png'
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
        <div className="h-screen flex flex-row justify-center bg-white">
                <div className="hidden sm:h-[screen]  sm:flex sm:flex-1 sm:pt-[250px] sm:items-center flex-col xl:pt-[0px]  xl:justify-center items-center   bg-white ">
                        <div className="flex flex-row items-center">
                            <img className="w-[50px] h-[70px] mb-4" src={orangesodacast} alt="My svg Image"></img>
                            <div className="text-[25px] text-[black]">OrangeSoda Cast</div>
                        </div>
                        
                        <div className="mb-4"><span>Connecting Stories That Matter Is Juicy</span></div>
                        <LoginButton></LoginButton>
                        <div>沒有帳號嗎？<a href="https://www.spotify.com/tw/signup?flow_id=a509106b-1dea-4a14-ab29-36d5956f2e52%3A1721379842&forward_url=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2B%250A%2B%2Buser-read-email%250A%2Buser-read-playback-state%250A%2Bplaylist-read-private%250A%2Bplaylist-modify-public%2Bplaylist-modify-private%2Buser-library-read%2Buser-library-modify%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A5173%252Fcallback%26code_challenge_method%3DS256%26client_id%3Dfb776a0db69e4d0295a2297fd43e4f01%26code_challenge%3DPNPS9Uyuoj6Pqa1YWodsrGly0cOlisfsO6szY0xQOk0%26flow_ctx%3Da509106b-1dea-4a14-ab29-36d5956f2e52%253A1721379842"><span className="underline">註冊帳號</span></a></div>                
                </div>
                {/* <>Mobile</> */}
                <Swiper className=" sm:hidden flex flex-1 bg-carousel03"
                        modules={[Navigation,Pagination,Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay:2000, disableOnInteraction: true }}
                        loop ={false}
                        speed = {2000}
                        >
                        <SwiperSlide>
                            <div className="h-full  pt-[20px] flex flex-col items-center bg-carousel01 text-white">
                                <img className="max-w-[250px] w-full mb-[20px]" src={carousel01} />
                                <div className="flex flex-row items-center">
                                    <img className="w-[50px] h-[70px] mb-4" src={orangesodacast} alt="My svg Image"></img>
                                    <div className="text-[25px] text-white">OrangeSoda Cast</div>
                                </div>
                                <div className="text-[42px] mb-6">鼓舞人心的故事</div>
                                <p className="text-[16px]">從非凡的人生故事和成功經歷中獲得靈感</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-full  pt-[20px]  flex flex-col items-center bg-carousel02 text-white">
                                <img className="max-w-[250px] w-full  mb-[20px]" src={carousel02}/>
                                <div className="flex flex-row items-center">
                                    <img className="w-[50px] h-[70px] mb-4" src={orangesodacast} alt="My svg Image"></img>
                                    <div className="text-[25px] text-white">OrangeSoda Cast</div>
                                </div>
                                <div className="text-[42px] mb-6">輕鬆分類與管理</div>
                                    <p className="text-[16px]">一目了然的分類，讓收藏的Podcast保持整潔</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-full pt-[20px] flex flex-col items-center bg-carousel03 text-white">
                                <img className="max-w-[250px] w-full mb-[20px]" src={carousel03}/>
                                <div className="flex flex-row items-center">
                                    <img className="w-[50px] h-[70px] mb-4" src={orangesodacast} alt="My svg Image"></img>
                                    <div className="text-[25px] text-white">OrangeSoda Cast</div>
                                </div>
                                <div className="text-[42px] mb-6">Spotify 快速同步</div>
                                    <p className="text-[16px]">透過Spotify登入，即刻同步您的收藏</p>
                                    <p className="text-[16px]">隨時隨地收聽</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="h-screen sm:hidden pt-[150px] flex flex-col items-center  bg-[#fff] text-[black]">
                        <div className="flex flex-row items-center">
                                    <img className="w-[50px] h-[70px] mb-4" src={orangesodacast} alt="My svg Image"></img>
                                    <div className="text-[25px] text-[black]">OrangeSoda Cast</div>
                                </div>
                            <div className="mb-4"><span>Connecting Stories That Matter</span></div>
                            <LoginButton></LoginButton>
                            <div className="text-black">沒有帳號嗎？<a to="/home"><span className=" text-[black] underline">註冊帳號</span></a></div> 
                        </div>
                        </SwiperSlide>

                        </Swiper>
                    {/* <>PC</> */}
                    <Swiper className="hidden  sm:block flex flex-1 bg-carousel03"
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