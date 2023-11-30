import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonial = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5001/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section>
            <SectionTitle
                subHeading='What Our Clients Say'
                heading='TESTIMONIALS'
            ></SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper max-w-screen-lg">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className='flex flex-col items-center my-16 mx-24'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <h3 className='text-2xl text-[#D99904] py-2'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;