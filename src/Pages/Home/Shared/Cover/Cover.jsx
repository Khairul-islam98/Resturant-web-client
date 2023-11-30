import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({img, title, para}) => {
    return (
        <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={-200}
    >
        <div className="hero min-h-[600px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-white">{title}</h1>
                    <p className="mb-5 text-white">{para}</p>
                </div>
            </div>
        </div>
    </Parallax>
    );
};

export default Cover;