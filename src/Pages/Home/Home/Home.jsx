import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import FeatureSection from '../FeatureSection/FeatureSection';
import Testimonial from '../Testimonial/Testimonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
           <Banner />
           <Category />
           <PopularMenu />
           <FeatureSection />
           <Testimonial />
        </div>
    );
};

export default Home;