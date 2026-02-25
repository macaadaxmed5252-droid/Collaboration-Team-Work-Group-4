import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer"; 
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Resturents from "./pages/Resturents";
import About from "./pages/About";

// Admin Imports
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard"; 
import CreateRestaurant from "./pages/CreateRestaurant";
import ManageRestaurant from "./pages/ManageRestaurant";
import EditRestaurant from "./pages/edit-restaurant"; // LA SAXAY

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/resturents" element={<><Header /><Resturents /><Footer /></>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="create-restaurant" element={<CreateRestaurant />} />
          <Route path="manage-restaurant" element={<ManageRestaurant />} />
          <Route path="edit-restaurant/:id" element={<EditRestaurant />} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;