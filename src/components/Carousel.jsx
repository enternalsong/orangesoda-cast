import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import carousel01 from './../assets/images/carousel01.png';
import carousel02 from './../assets/images/carousel02.png';
import carousel03 from './../assets/images/carousel03.png';
const Carousel = () =>{
    return(
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination = {{clickable: true}}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay= {{ delay:2500 , disableOnInteraction: false}}
        >
        <SwiperSlide className="" >
            <div className="">
                <img className="w-full" src={carousel01}></img>
            </div>
        </SwiperSlide>
        <SwiperSlide className="">
            <div className="">
                <img className="w-full" src={carousel02}></img>
            </div>
        </SwiperSlide>
        <SwiperSlide className="">
            <div className="">
                <img className="w-full" src={carousel03}></img>
            </div>
        </SwiperSlide>
        </Swiper>
    )
}
export default Carousel;