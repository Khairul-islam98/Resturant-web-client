import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cover from '../../Home/Shared/Cover/Cover';
import shop from '../../../assets/shop/banner2.jpg'
import useMenu from '../../../hooks/UseMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['Salad', 'Pizza', 'Soup', 'dessert', 'Drinks'];
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu()
    const salad = menu.filter(menu => menu.category === 'salad')
    const pizza = menu.filter(menu => menu.category === 'pizza')
    const drink = menu.filter(menu => menu.category === 'drinks')
    const dessert = menu.filter(menu => menu.category === 'dessert')
    const soup = menu.filter(menu => menu.category === 'soup')
    return (
        <div>
            <Cover
            img={shop}
            title="Order Menu"
            para='Would you like to try a dish?'
            ></Cover>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>salad</Tab>
                    <Tab>pizza</Tab>
                    <Tab>soups</Tab>
                    <Tab>desserts</Tab>
                    <Tab>drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={drink}></OrderTab>
                </TabPanel>
              
            </Tabs>
        </div>
    );
};

export default Order;