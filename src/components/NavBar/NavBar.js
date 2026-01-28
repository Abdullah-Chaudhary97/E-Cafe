import React, { useState } from "react";
import logo from "../../assets/img/hLogo.png";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function NavBar() {
  const [isOpen, setisOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  
  function handleClick() {
    setisOpen(!isOpen);
  }
  
  const cartItemCount = getCartItemCount();
  return (
    <div>
      <header id="header" className="fixed top-[40px] left-0 right-0 z-50 bg-dark border-b border-primary/20">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center no-underline">
            <img 
              src={logo} 
              alt="E-Cafe Logo" 
              className="max-w-[120px] max-h-[45px] w-auto h-auto object-contain md:max-w-[100px] md:max-h-[40px] sm:max-w-[80px] sm:max-h-[35px]" 
            />
          </Link>
          
          <nav className="hidden lg:flex">
            <ul className="flex items-center list-none m-0 p-0">
              <li className="relative">
                <Link to="/" className="flex items-center px-0 py-1.5 pl-6 text-white text-xs whitespace-nowrap transition-colors duration-300 hover:text-primary-light no-underline">
                  Home
                </Link>
              </li>
              <li className="relative">
                <Link to='/Product' className="flex items-center px-0 py-1.5 pl-6 text-white text-xs whitespace-nowrap transition-colors duration-300 hover:text-primary-light no-underline">
                  Menu
                </Link>
              </li>
              <li className="relative">
                <Link to="/AboutUs" className="flex items-center px-0 py-1.5 pl-6 text-white text-xs whitespace-nowrap transition-colors duration-300 hover:text-primary-light no-underline">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              to="/Reservation"
              className="border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 no-underline ml-6"
            >
              Book a table
            </Link>
            <Link
              to="/Cart"
              className="border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 no-underline relative"
            >
              Cart {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <span className="border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 cursor-pointer">
                  {user?.name || 'User'}
                </span>
                <button
                  onClick={logout}
                  className="bg-transparent border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
              <Link
                to="/SignUp"
                className="border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 no-underline"
              >
                SignUp
              </Link>
              <Link
                to="/LogIn"
                className="border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 no-underline"
              >
                Login
              </Link>
              </>
            )}
          </div>
          
          <div 
            onClick={handleClick} 
            className="text-white cursor-pointer lg:hidden"
          >
            {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
        </div>
        
        {isOpen && (
          <div className="lg:hidden">
            <section className="w-[250px] h-[400px] bg-dark/60 absolute top-[96px] right-0 text-white z-50">
              <nav className="p-3">
                <ul className="list-none p-0 m-0">
                  <li className="py-2 border-b border-white">
                    <Link to="/" className="text-white text-sm no-underline hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="py-2 border-b border-white">
                    <Link to="/Product" className="text-white text-sm no-underline hover:text-primary transition-colors">
                      Menu
                    </Link>
                  </li>
                  <li className="py-2 border-b border-white">
                    <Link to="/AboutUs" className="text-white text-sm no-underline hover:text-primary transition-colors">
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
              <Link 
                to="/Reservation" 
                className="block mt-3 mx-3 border-2 border-primary text-white rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-dark hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 text-center no-underline"
              >
                Book a table
              </Link>
            </section>
          </div>
        )}
      </header>
    </div>
  );
}
