import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import feature from '../../../assets/home/featured.jpg'
import './feature.css'

const FeatureSection = () => {
    return (
        <div className='feature bg-fixed text-white mb-10 mt-10 pt-8'>
            <SectionTitle 
                subHeading='Check it out'
                heading='FROM OUR MENU'
            ></SectionTitle>
            <div className='md: flex justify-center items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={feature} alt="" />
                </div>
                <div className='md: ml-10'>
                    <p>March 20, 2023</p>
                    <h3 className=' uppercase'>WHERE CAN I GET SOME?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className='btn btn-outline border-0 border-b-4 text-white mt-4'>Read More</button>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;