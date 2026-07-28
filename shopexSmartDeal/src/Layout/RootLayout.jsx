import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-8xl mx-auto'>
            <Navbar></Navbar>
           <main className='min-h-screen bg-[#E9E9E9]'> <Outlet></Outlet></main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;