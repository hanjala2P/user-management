import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyBids = () => {
    const {user} = use(AuthContext);
    const [bids,setBids]= useState([])
    const axiosSecure =useAxiosSecure();

  useEffect(()=>{
    if(user?.email){
        axiosSecure.get(`/bids?email=${user.email}`)
        .then(async res =>{
            const data = res.data;

            if(!Array.isArray(data)){
                setBids([]);
                return;
            }

            // fetch product info (title, image) for each bid so the table shows real data
            const bidsWithProduct = await Promise.all(
                data.map(async (bid) => {
                    try {
                        const productRes = await axiosSecure.get(`/products/${bid.product}`);
                        const product = productRes.data;
                        return {
                            ...bid,
                            product_title: product?.title,
                            product_image: product?.image,
                        };
                    } catch (err) {
                        return bid;
                    }
                })
            );

            setBids(bidsWithProduct);
        })
        .catch(err => console.error('Failed to load bids', err));
    }
  },[user,axiosSecure])

    const handleDlt =(_id)=>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed)
   {
    axiosSecure.delete(`/bids/${_id}`)
    .then(res=> {
        if(res.data.deletedCount > 0){
            Swal.fire({
                title: "Deleted!",
                text: "Your bid has been successfully deleted.",
                icon: "success"
            });

            // remove deleted bid from ui only after confirmed success
            const remainingBids = bids.filter(bid=> bid._id !== _id);
            setBids(remainingBids)
        } else {
            Swal.fire({
                title: "Failed!",
                text: "Could not delete the bid. Please try again.",
                icon: "error"
            });
        }
    })
    .catch(err => {
        console.error('Delete failed', err);
        Swal.fire({
            title: "Failed!",
            text: "Could not delete the bid. Please try again.",
            icon: "error"
        });
    });
   }
});

    }
    return (
        <div className='max-w-4xl mx-auto px-4 py-6 sm:p-6'>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">my bids : { bids.length}</h2>

            {/* Mobile card view */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
                {bids.map((bid) => (
                    <div key={bid._id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col">
                        <img
                            src={bid?.product_image}
                            alt={bid?.product_title}
                            className="w-full h-28 object-cover rounded-lg bg-gray-200 mb-2"
                        />
                        <div className="font-bold text-sm mb-1 line-clamp-1">{bid?.product_title}</div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">${bid?.bid_price}</span>
                            {bid?.status === 'pending' ? (
                                <div className="badge badge-warning badge-sm">{bid?.status}</div>
                            ) : (
                                <div className="badge badge-success badge-sm">{bid?.status}</div>
                            )}
                        </div>
                        <button
                            onClick={() => handleDlt(bid?._id)}
                            className="btn btn-outline btn-xs w-full mt-auto"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Table view for md+ screens */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th> #</th>
        <th>Product</th>
        <th>Bid Price</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

     { bids.map((bid, index) => <tr key={bid._id}>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex flex-col items-start gap-2 py-2">
            <img
              src={bid?.product_image}
              alt={bid?.product_title}
              className="w-16 h-16 rounded-md object-cover bg-gray-200"
            />
            <div className="font-bold whitespace-nowrap">{bid?.product_title}</div>
          </div>
        </td>
        <td className="whitespace-nowrap">${bid?.bid_price}</td>
        <td>
            {bid?.status === 'pending' ?<div className="badge badge-warning">
                {bid?.status}
            </div>:<div className="badge badge-success">
                {bid?.status}
            </div>
            }
        </td>
        <th>
          <button onClick={()=> handleDlt(bid?._id)} className="btn btn-outline btn-xs">Remove</button>
        </th>
      </tr>)}
    </tbody>
    {/* foot */}
  </table>
</div>

        </div>
    );
};

export default MyBids;