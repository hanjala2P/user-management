import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           <main className='min-h-screen'> <Outlet></Outlet></main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;