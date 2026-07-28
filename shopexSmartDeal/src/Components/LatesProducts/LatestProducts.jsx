import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({latestProductsPromise}) => {
    const products = use(latestProductsPromise);
    console.log(products)
    return (
        <div className='mt-12 max-w-7xl mx-auto px-4'>
            <h2 className='text-center font-bold text-3xl md:text-5xl lg:text-6xl'>Recent Products</h2>
            
           
            <div className='mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
                {
                    products.map(product => <Product 
                        key={product._id} 
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default LatestProducts;