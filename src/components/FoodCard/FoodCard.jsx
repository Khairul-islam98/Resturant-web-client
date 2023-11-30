import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

const FoodCard = ({ items }) => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    const [, refetch] = useCart()
    const { name, image, title, recipe, price, _id } = items;
    const handleAddToCart = () => {
        if (user && user.email){
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                console.log(res.data);
                toast.success(`${name} added to your cart`)
                refetch()
            })
            
        }
        else{
            toast.error('You are not logged in')
            navigate('/login', {state: {from: location}})
        }
    }
    
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className=' absolute right-0 bg-slate-900 px-2 mr-4 mt-4 text-white'>{price}</p>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleAddToCart} className="btn bg-[#E8E8E8] btn-outline border-0 border-b-4 border-orange-400 text-orange-300 mt-4 uppercase mx-auto">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;