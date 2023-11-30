import React from 'react';
import MenuItem from '../../Home/Shared/MenuItem/MenuItem';
import Cover from '../../Home/Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title, coverImg, para}) => {
    return (
        <div className='pt-10'>
            { title && <Cover
            img={coverImg}
            title={title}
            para={para}
            ></Cover>}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10'>
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
            <button className='btn btn-outline bg-red-400 border-0 border-b-4 text-white mt-4'>Read More</button>
            </Link>
        </div>
    );
};

export default MenuCategory;