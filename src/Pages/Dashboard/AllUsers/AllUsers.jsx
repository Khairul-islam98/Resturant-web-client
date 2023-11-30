import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: user = [], refetch} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/user/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                toast.success(`${user.name} role admin success`)
                refetch()
            }
        })
    }

    const handleDelete = (id) => {
        axiosSecure.delete(`/user/${id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.deletedCount > 0){
                toast.success(`deleted success`)
                refetch()
            }
        })
    }

    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h2 className='text-3xl'>All Users</h2>
                <h2 className='text-3xl'>Total Users: {user.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                   { user.role === 'admin' ? 'Admin'  : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-lg bg-orange-500">
                                        <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={()=>handleDelete(user._id)}
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
    );
};

export default AllUsers;