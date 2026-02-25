import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ role }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // If no user is logged in
    if (!user) {
        // Redirect to admin-login if trying to access admin routes, otherwise regular login
        return <Navigate to="/admin-login" replace />;
    }

    // Role-based check
    if (role && user.role !== role) {
        Swal.fire({
            title: 'Ma tihid Admin!',
            text: 'Fadlan, boggan waxaa loogu talagalay maamulka kaliya.',
            icon: 'error',
            confirmButtonColor: '#ea580c'
        });
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
