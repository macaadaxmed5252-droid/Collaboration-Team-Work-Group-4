import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Resturents from "./pages/Resturents";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import RestaurantDetails from "./pages/RestaurantDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup"; // Add this

// Admin Imports
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import CreateRestaurant from "./pages/CreateRestaurant";
import ManageRestaurant from "./pages/ManageRestaurant";
import EditRestaurant from "./pages/edit-restaurant";
import ReviewMessages from "./pages/Reviewmessages";
import ManageUsers from "./pages/ManageUsers";
import MenuManagement from "./pages/MenuManagement";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/resturents" element={<><Header /><Resturents /><Footer /></>} />
        <Route path="/restaurant/:id" element={<><Header /><RestaurantDetails /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/profile" element={<><Header /><Profile /><Footer /></>} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create-restaurant" element={<CreateRestaurant />} />
            <Route path="manage-restaurant" element={<ManageRestaurant />} />
            <Route path="edit-restaurant/:id" element={<EditRestaurant />} />
            <Route path="review-messages" element={<ReviewMessages />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="menu-management" element={<MenuManagement />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;