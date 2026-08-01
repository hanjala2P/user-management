import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://shopex-smart-deal-server.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setProducts([]);
                }
            })
            .catch(err => {
                console.error('Failed to load products', err);
                setProducts([]);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load products",
                    text: "Please check your connection and try again."
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-2">All Products</h2>
            <div className="w-12 h-2 bg-primary rounded mx-auto mb-10"></div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover bg-gray-200"
                            />
                            <div className="p-5 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-lg">{product.title}</h3>
                                    {product.category && (
                                        <span className="badge bg-purple-300 badge-outline border-primary whitespace-nowrap">
                                            {product.category}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <p className="text-green-500 text-xl font-bold">
                                        ${product.price_min} - {product.price_max}
                                    </p>
                                    <p className="text-gray-400 text-xs">Price starts from</p>
                                </div>

                                {product.seller_name && (
                                    <div className="flex items-center gap-2 pt-1">
                                        <img
                                            src={product.seller_image}
                                            alt={product.seller_name}
                                            className="w-6 h-6 rounded-full object-cover bg-gray-200"
                                        />
                                        <span className="text-sm text-gray-500">{product.seller_name}</span>
                                    </div>
                                )}

                                <Link
                                    to={`/productDetails/${product._id}`}
                                    className="btn btn-primary btn-sm w-full mt-2"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;