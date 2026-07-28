import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const {user,signOutUser}=use(AuthContext);
  const handleSignOut =()=>{
      signOutUser()
      .then()
      .catch()
  }
    const navLinks = <>
   <li><NavLink to='/'>Home</NavLink></li>
   <li><NavLink to='/allProducts'>All Products</NavLink></li>

   {
    user && <>
      <li><NavLink to='/myProducts'>My Products</NavLink></li>
   <li><NavLink to='/MyBids'>My Bids</NavLink></li>
    </>
   }
   </>
 
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
             {navLinks}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost font-bold text-xl">Smart <span className="text-primary"> Deals</span>
            
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {navLinks}
          </ul>
        </div>
    <div className="navbar-end gap-3">
  {user ? (
    <button onClick={handleSignOut} className='btn btn-primary'>Signout</button>
  ) : (
    <>
      <Link to="/login">
        <button className="btn border-primary text-primary lg:px-8" type="button">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="btn lg:px-8 text-white btn-primary" type="button">
          Register
        </button>
      </Link>
    </>
  )}
</div>
      </div>
    </div>
  );
};

export default Navbar;
