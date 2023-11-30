import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../../Providers/AuthProvider';
import useCart from '../../../../hooks/useCart';
import useAdmin from '../../../../hooks/useAdmin';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const [cart] = useCart()
    const [isAdmin] = useAdmin()

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/Salad'>Order Menu</Link></li>
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        <li><Link to='/dashboard/cart'>
            <button className="flex">
            <FaShoppingCart className="mr-2"></FaShoppingCart>
                <div className="badge badge-secondary">{cart.length}</div>
            </button>
        </Link></li>
        <li><Link>Home</Link></li>
        {
            user ? <>
                <button onClick={handleLogout} className='btn btn-ghost'>LOGOUT</button>
            </> : <>
                <li><Link to='/login'>Login</Link></li>
            </>
        }
    </>

    return (
        <div>
            <div className="navbar fixed z-10 text-white opacity-70 rounded-b-xl max-w-screen-xl mx-auto bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black  rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <p className="text-white text-xl">Bistro-Boss <br /> Restaurant</p>
                </div>
                <div className='navbar-end'>
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="">
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;