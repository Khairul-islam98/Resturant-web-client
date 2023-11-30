import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <section>
            <SectionTitle subHeading={"From 11:00am to 10:00pm"}
                heading={"ORDER ONLINE"}>
            </SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper mb-10 max-w-screen-sm"
            >
                <SwiperSlide>
                    <img src={img1} alt="" />
                    <p className=' text-white uppercase -mt-10 font-medium text-center'>Salads</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="" />
                    <p className=' text-white uppercase -mt-10 font-medium text-center'>pizzas</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="" />
                    <p className=' text-white uppercase -mt-10 font-medium text-center'>Soups</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="" />
                    <p className=' text-white uppercase -mt-10 font-medium text-center'>desserts</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="" />
                    <p className=' text-white uppercase -mt-10 font-medium text-center'>Salads</p>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;