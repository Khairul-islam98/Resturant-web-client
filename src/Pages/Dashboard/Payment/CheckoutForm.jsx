import React from 'react';
import { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const { user } = useAuth()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    if (totalPrice > 0) {
        useEffect(() => {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }, [axiosSecure, totalPrice])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('pyment error', error);
            setError(error.message)
        } else {
            console.log('payment method success', paymentMethod);
            setError('')
        }

        // confirm the payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payment', payment)
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    toast.success("Thank you for the taka paisa")
                }
            }
        }

    }



    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            >

            </CardElement>
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className=' text-red-500'>{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;