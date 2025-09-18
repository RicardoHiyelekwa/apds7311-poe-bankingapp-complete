import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import RegisterCustomer from './pages/RegisterCustomer';
import LoginCustomer from './pages/LoginCustomer';
import LoginEmployee from './pages/LoginEmployee';
import CustomerDashboard from './pages/CustomerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<RegisterCustomer />} />
        <Route path='register' element={<RegisterCustomer />} />
        <Route path='login-customer' element={<LoginCustomer />} />
        <Route path='login-employee' element={<LoginEmployee />} />
        <Route path='customer' element={<CustomerDashboard />} />
        <Route path='employee' element={<EmployeeDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
