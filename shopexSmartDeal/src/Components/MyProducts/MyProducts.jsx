import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const { user } = use(AuthContext);
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/products?email=${user.email}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setProducts(res.data);
                    } else {
                        console.error('Expected an array but got:', res.data);
                        setProducts([]);
                    }
                })
                .catch(err => console.error('Failed to load products', err));
        }
    }, [user, axiosSecure]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been successfully deleted.",
                                icon: "success"
                            });

                            // remove deleted product from ui only after confirmed success
                            const remainingProducts = products.filter(product => product._id !== _id);
                            setProducts(remainingProducts);
                        } else {
                            Swal.fire({
                                title: "Failed!",
                                text: "Could not delete the product. Please try again.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(err => {
                        // console.error('Delete failed', err);
                        Swal.fire({
                            title: "Failed!",
                            text: "Could not delete the product. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className='max-w-5xl mx-auto px-4 py-6 sm:p-6'>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">My Products</h2>
            <div className="w-12 h-2 bg-primary rounded mx-auto mb-8 sm:mb-10"></div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">You haven't added any products yet.</p>
            ) : (
                <>
                    {/* Mobile card view */}
                    <div className="grid gap-4 md:hidden">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-xl shadow-sm p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-14 w-14">
                                            <img src={product.image} alt={product.title} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{product.title}</div>
                                        <div className="text-sm text-gray-500">
                                            ${product.price_min} - ${product.price_max}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/productDetails/${product._id}`}
                                        className="btn btn-outline btn-xs flex-1"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn btn-outline btn-error btn-xs flex-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table view for md+ screens */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={product.image} alt={product.title} />
                                                    </div>
                                                </div>
                                                <div className="font-bold whitespace-nowrap">{product.title}</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap">${product.price_min} - ${product.price_max}</td>
                                        <th>
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/productDetails/${product._id}`}
                                                    className="btn btn-outline btn-xs"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn btn-outline btn-error btn-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyProducts;