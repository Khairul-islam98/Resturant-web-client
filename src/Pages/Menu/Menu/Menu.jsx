import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Home/Shared/Cover/Cover';
import img from '../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/UseMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
    const [menu] = useMenu()
    const salad = menu.filter(menu => menu.category === 'salad')
    const pizza = menu.filter(menu => menu.category === 'pizza')
    const offered = menu.filter(menu => menu.category === 'offered')
    const dessert = menu.filter(menu => menu.category === 'dessert')
    const soup = menu.filter(menu => menu.category === 'soup')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
            img={img}
            title='OUR MENU'
            para='Would you like to try a dish?'
            ></Cover>
            <SectionTitle
            subHeading="Don't miss" heading="TODAY'S OFFER"
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory
            items={dessert}
            title='dessert'
            para='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            coverImg={dessertImg}
            ></MenuCategory>
            <MenuCategory
            items={pizza}
            title='Pizza'
            para='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            coverImg={pizzaImg}
            ></MenuCategory>
            <MenuCategory
            items={salad}
            title='Salad'
            para='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            coverImg={saladImg}
            ></MenuCategory>
            <MenuCategory
            items={soup}
            title='Soup'
            para='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            coverImg={soupImg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;