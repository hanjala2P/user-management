import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyBids = () => {
    const {user} = use(AuthContext);
    const [bids,setBids]= useState([])
    const axiosSecure =useAxiosSecure();

  useEffect(()=>{
    axiosSecure.get(`/bids?email=${user?.email}`)
    .then(data =>{
      setBids(data.data)
    })
  },[user,axiosSecure])

    // useEffect(()=>{
    //     if(user?.email){
    //         fetch(`http://localhost:3000/bids?email=${user?.email}`,{
    //             headers:{
    //                 authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         .then(res=> res.json())
    //         .then(async data =>{
    //             console.log(data);

    //             if(!Array.isArray(data)){
    //                 console.error('Expected an array but got:', data);
    //                 setBids([]);
    //                 return;
    //             }

    //             // fetch product info (title, image) for each bid so the table shows real data
    //             const bidsWithProduct = await Promise.all(
    //                 data.map(async (bid) => {
    //                     try {
    //                         const res = await fetch(`http://localhost:3000/products/${bid.product}`);
    //                         const product = await res.json();
    //                         return {
    //                             ...bid,
    //                             product_title: product?.title,
    //                             product_image: product?.image,
    //                         };
    //                     } catch (err) {
    //                         console.error('Failed to load product for bid', bid._id, err);
    //                         return bid;
    //                     }
    //                 })
    //             );

    //             setBids(bidsWithProduct);
    //         })
    //     }

    // },[user?.email])

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
    fetch(`http://localhost:3000/bids/${_id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=> {
        // console.log('after dlt', data)
        if(data.deletedCount > 0){
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
    });
   }
});

    }
    return (
        <div className='max-w-4xl  mx-auto'>
            <h2>my bids : { bids.length}</h2>
            <div className="overflow-x-auto">
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
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={bid?.product_image}
                  alt={bid?.product_title} />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid?.product_title}</div>
            </div>
          </div>
        </td>
        <td>${bid?.bid_price}</td>
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