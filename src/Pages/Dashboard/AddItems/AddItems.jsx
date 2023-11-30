import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast';


const img_hosting_key = import.meta.env.VITE_img_hosting_key
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const AddItems = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            const menuItem ={
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                toast.success('successfully added')
            }
        }
    }
    return (
        <div>
            <SectionTitle heading='ADD AN ITEM' subHeading="What's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;