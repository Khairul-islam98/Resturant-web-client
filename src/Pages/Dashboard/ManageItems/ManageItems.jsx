import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useMenu from '../../../hooks/UseMenu';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageItems = () => {
    const [menu, , refetch] = useMenu()
    const axiosSecure = useAxiosSecure()
    const handleDeleteItem = (item) => {
        axiosSecure.delete(`/menu/${item._id}`)
        .then(res => {
            if(res.data.deletedCount > 0){
                refetch()
                toast.success(`${item.name} deleted successfully`)
            }
        })
        
        
    }
    return (
        <div>
            <SectionTitle heading='MANAGE ALL ITEMS' subHeading='Hurry Up!'></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
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
                                    <td className="text-right">${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItems/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-lg bg-orange-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;