import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Modern App</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/about" className="hover:text-secondary">About</Link>
          <Link to="/crud" className="hover:text-secondary">CRUD App</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
