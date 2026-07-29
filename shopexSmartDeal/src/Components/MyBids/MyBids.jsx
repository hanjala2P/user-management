import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const {user} = use(AuthContext);
    const [bids,setBids]= useState([])

    useEffect(()=>{
        if(user?.email){
            fetch(`http://localhost:3000/bids?email=${user?.email}`,{
                headers:{
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res=> res.json())
            .then(data =>{
                console.log(data);
                setBids(data)
            })
        }

    },[user?.email])


    // useEffect(()=>{
    //     if(user?.email){
    //         fetch(`http://localhost:3000/bids?email=${user.email}`,{
    //             headers:{
    //                 authorization: `Bearer ${user.accessToken}`
    //             }
    //         })
    //         .then(res=> res.json())
    //         .then(data =>{
    //             console.log(data);
    //             setBids(data)
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
        console.log('after dlt', data)
    })
     Swal.fire({
    title: "Deleted!",
    text: "Your bid has been successfully deleted.",
    icon: "success"
  });
//   remove dlt bid from ui 
    const remainingBids = bids.filter(bid=> bid._id !==_id);
    setBids(remainingBids)
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
        <th>Seller</th>
        <th>Bid Price</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
 
     { bids.map(bid => <tr key={bid._id}>
        <th>
  
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Yancy Tear</div>
              <div className="text-sm opacity-50">Brazil</div>
            </div>
          </div>
        </td>
        <td>
          Wyman-Ledner
          <br />
          <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
        </td>
        <td>{bid?.bid_price}</td>
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