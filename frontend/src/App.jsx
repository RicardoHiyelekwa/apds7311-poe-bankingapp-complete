import React from 'react';
import { Outlet, Link } from 'react-router-dom';
export default function App(){
  return (
    <div className="app-container">
      <div className="card-hero mb-4">
        <div className="header-brand mb-3">
          <div className="logo-circle">B</div>
          <div><h3 className="mb-0">Banking Portal</h3><div className="small-muted">Payments system - APDS7311</div></div>
          <div className="ms-auto">
            <Link to="/register" className="btn btn-outline-primary me-2">Register</Link>
            <Link to="/login-customer" className="btn btn-outline-primary me-2">Customer Login</Link>
            <Link to="/login-employee" className="btn btn-outline-secondary">Employee Login</Link>
          </div>
        </div>
        <Outlet />
      </div>
      <footer className="text-center small-muted">2025 • APDS7311 POE</footer>
    </div>
  );
}
