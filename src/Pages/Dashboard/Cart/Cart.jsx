import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    const handleDelete = id => {
        axiosSecure.delete(`/carts/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.deletedCount > 0) {
                toast.success(`Deleted successfully`)
                refetch()
            }
        })
    }

    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className="text-3xl">Items: {cart.length}</h2>
                <h2 className="text-3xl">Total Price: {totalPrice}</h2>
                {
                    cart.length ? <Link to='/dashboard/payment'><button className="btn btn-primary">Pay</button></Link>
                    :
                    <button disabled className="btn btn-primary">Pay</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>  <tr key={item._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>${item.price}</td>
                            <th>
                                <button
                                onClick={()=> handleDelete(item._id)}
                                    className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                </button>
                            </th>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;