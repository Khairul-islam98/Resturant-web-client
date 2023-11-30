import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const{user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <progress className="progress progress-success w-56" value="100" max="100"></progress>
    }

    if(user && isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;