import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center my-7 w-3/12 mx-auto '>
            <p className='text-[#D99904] mb-2'>--- {subHeading} ---</p>
            <h3 className='border-y-4 lg:text-4xl uppercase py-2 '>{heading}</h3>
        </div>
    );
};

export default SectionTitle;