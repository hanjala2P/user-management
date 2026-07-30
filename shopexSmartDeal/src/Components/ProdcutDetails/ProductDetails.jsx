import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetails = () => {
  const navigate = useNavigate()
  const {
    title,
    price_min,
    price_max,
    image,
    category,
    _id: productId, // রিনেম করা আইডি
    created_at,
    seller_image,
    seller_name,
    email,
    location,
    seller_contact,
    status,
    condition,
    usage,
    description,
  } = useLoaderData();
  
  const { user } = use(AuthContext);
  const bidModalRef = useRef(null);
  const [bids , setBids]=useState([])


  useEffect(()=>{
    axios.get(`http://localhost:3000/products/bids/${productId}`)
    .then(data=>{
      // console.log('after axios get',data);
      setBids(data.data)
    })
  },[productId])

  // useEffect(() => {

  //   if (productId && user) {
  //     user.getIdToken().then(token => {
  //       fetch(`http://localhost:3000/bids?product=${productId}`, {
  //         headers: {
  //           authorization: `Bearer ${token}`
  //         }
  //       })
  //         .then(res => res.json())
  //         .then(data => {
  //             console.log('bids for this product', data);
  //             if(Array.isArray(data)){
  //               setBids(data)
  //             } else {
  //               console.error('Expected an array but got:', data);
  //               setBids([])
  //             }
  //         });
  //     });
  //   }
  // }, [productId, user]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidModalClose = () => bidModalRef.current?.close();

  const handleBidSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const contact = e.target.contact.value;

   
    const newBid = {
        product: productId,
        buyer_name: name,
        buyer_email: email,
        buyer_image: user?.photoURL,
        bid_price: bid,
        contact_info: contact,
        status: 'pending'
    };

    fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newBid)
    })
    .then(res => res.json())
    .then(data => {
        if(data.insertedId){
            bidModalRef.current.close();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Bid has been Placed",
              showConfirmButton: false,
              timer: 1500
            });

            // add new bid in the state
            newBid._id=data.insertedId;
            const newBids =[...bids,newBid];
            newBids.sort((a,b)=> b.bid_price - a.bid_price);
            setBids(newBids)

        }
    });
  };

  const postedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
       onClick={() => navigate(-1)}
        className="btn btn-outline inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-4"
      >
        ← Back To Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <img
            src={image}
            alt={title}
            className="w-full h-72 object-cover rounded-xl bg-gray-200"
          />

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-3">Product Description</h3>
            <div className="flex gap-8 mb-3">
              <p className="text-sm">
                Condition :{" "}
                <span className="text-purple-600 font-medium">{condition}</span>
              </p>
              <p className="text-sm">
                Usage Time :{" "}
                <span className="text-purple-600 font-medium">{usage}</span>
              </p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className="badge bg-purple-300 badge-outline border-primary mt-2">
              {category}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-green-500 text-2xl font-bold">
              ${price_min} - {price_max}
            </p>
            <p className="text-gray-400 text-sm">Price starts from</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-3">Product Details</h3>
            <p className="text-sm text-gray-500">
              Product ID: <span className="text-gray-700">{productId}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Posted: <span className="text-gray-700">{postedDate}</span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-3">Seller Information</h3>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{seller_name}</p>
                <p className="text-sm text-gray-400">{email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Location: <span className="text-gray-700">{location}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Contact: <span className="text-gray-700">{seller_contact}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              Status:{" "}
              <span className="badge badge-warning badge-sm">{status}</span>
            </p>
          </div>

          <button className="btn w-full btn-primary" onClick={handleBidModalOpen}>
            I Want to Buy This Product
          </button>

          <dialog ref={bidModalRef} id="my_modal_4" className="modal bg-base-600/60">
            <div className="modal-box w-11/12 max-w-lg">
              <h3 className="font-bold text-lg text-center px-4 mb-4">
                Give Seller Your Offered Price
              </h3>

              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label htmlFor="buyerName" className="label">
                      <span className="label-text">Buyer Name</span>
                    </label>
                    <input
                      name="name"
                      className="input input-bordered w-full"
                      type="text"
                      readOnly
                      defaultValue={user?.displayName}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="buyerEmail" className="label">
                      <span className="label-text">Buyer Email</span>
                    </label>
                    <input
                      name="email"
                      className="input input-bordered w-full"
                      type="email"
                      defaultValue={user?.email}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="BuyerImageURL" className="label">
                    <span className="label-text">Buyer Image URL</span>
                  </label>
                  <input
                    name="image"
                    className="input input-bordered w-full"
                    type="text"
                    readOnly
                    defaultValue={user?.photoURL}
                  />
                </div>

                <div>
                  <label htmlFor="PlaceyourPrice" className="label">
                    <span className="label-text">Place your Price</span>
                  </label>
                  <input
                    name="bid"
                    className="input input-bordered w-full"
                    type="text"
                    required
                    placeholder="e.g. 900"
                  />
                </div>

                <div>
                  <label htmlFor="ContactInfo" className="label">
                    <span className="label-text">Contact Info</span>
                  </label>
                  <input
                    name="contact"
                    className="input input-bordered w-full"
                    type="text"
                    required
                    placeholder=" +8801xxxx"
                  />
                </div>

                <div className="modal-action flex-col sm:flex-row justify-end gap-2 mt-6">
                  <button
                    type="button"
                    className="btn btn-outline border-primary text-primary w-full sm:w-auto"
                    onClick={handleBidModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Submit Bid
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      {/* Bids for this product */}
      <section className="mt-12">
        <h3 className="font-bold text-4xl mb-6">
          Bids For This Product: <span className="text-primary">{bids.length < 10 ? `0${bids.length}` : bids.length}</span>
        </h3>

        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th>SL No</th>
                <th>Product</th>
                <th>Buyer</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={image}
                        alt={title}
                        className="w-10 h-10 rounded-md object-cover bg-gray-200"
                      />
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-xs text-gray-400">${price_min}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={bid.buyer_image}
                        alt={bid.buyer_name}
                        className="w-8 h-8 rounded-full object-cover bg-gray-200"
                      />
                      <div>
                        <p className="font-medium">{bid.buyer_name}</p>
                        <p className="text-xs text-gray-400">{bid.buyer_email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium">${bid.bid_price}</td>

                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline btn-success">
                        Accept Offer
                      </button>
                      <button className="btn btn-xs btn-outline btn-error">
                        Reject Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;