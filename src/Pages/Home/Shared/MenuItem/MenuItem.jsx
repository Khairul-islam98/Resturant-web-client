import React from 'react';

const MenuItem = ({item}) => {
    const { name, image, price, recipe} = item;
    return (
        <div className='flex space-x-4'>
            <img style={{borderRadius: '0px 200px 200px 200px'}} className=' w-28 h-24' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name} -----------------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-[#D99904]'>${price}</p>
        </div>
    );
};

export default MenuItem;