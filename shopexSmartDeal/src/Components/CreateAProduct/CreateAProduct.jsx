import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateAProduct = () => {
        const {user}=useAuth()
        const axiosSecure =useAxiosSecure()

      const handleCreateAProduct=(e)=>{
        e.preventDefault();

        const title = e.target.title.value;
        const image = e.target.image.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const condition = e.target.condition.value;
        const usage = e.target.usage.value;
        const description = e.target.description.value;
        const seller_contact = e.target.seller_contact.value;

        const newProduct = {
            title,
            image,
            price_min: Number(price_min),
            price_max: Number(price_max),
            category,
            location,
            condition,
            usage,
            description,
            seller_contact,
            email: user?.email,
            seller_name: user?.displayName,
            seller_image: user?.photoURL,
            created_at: new Date().toISOString(),
            status: 'available',
        }

        axiosSecure.post('/products', newProduct)
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your product has been successfully added",
                  showConfirmButton: false,
                  timer: 1500
                });
                e.target.reset();
            }
        })
        .catch(err => {
            // console.error('Failed to add product', err);
            Swal.fire({
                icon: "error",
                title: "Failed to add product",
                text: "Please try again."
            });
        })
      }


    return (
        <div className="px-4">
            <h2 className='text-center font-bold text-2xl sm:text-3xl mt-8'>Create a Product</h2>
            <div className='w-12 bg-primary h-2 rounded mx-auto mt-4'></div>
            <section className='w-full max-w-2xl outline outline-primary mx-auto mb-12 mt-12 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-18 bg-white rounded-2xl shadow-2xl'>
                <p className='text-center mb-8 sm:mb-12 text-lg font-medium'>Product Details form</p>
                              <form onSubmit={handleCreateAProduct} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label htmlFor="Name" className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      name="title"
                      placeholder='product name'
                      className="input input-bordered w-full"
                      type="text"

                      required
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="category" className="label">
                      <span className="label-text">Category</span>
                    </label>
                    <input
                      name="category"
                      placeholder='e.g. Fashion, Electronics'
                      className="input input-bordered w-full"
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    name="image"
                    placeholder='img url'
                    className="input input-bordered w-full"
                    type="text"
                    required
                  />
                </div>
                <div className='flex flex-col sm:flex-row justify-between gap-3'>
                        <div className="w-full">
                    <label htmlFor="price_min" className="label">
                      <span className="label-text">Price min</span>
                    </label>
                    <input
                      name="price_min"
                      placeholder='min price'
                      className="input input-bordered w-full"
                      type="number"
                      required
                    />
                  </div>
                    <div className="w-full">
                    <label htmlFor="price_max" className="label">
                      <span className="label-text">Price max</span>
                    </label>
                    <input
                      name="price_max"
                      placeholder='max price'
                      className="input input-bordered w-full"
                      type="number"
                      required
                    />
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between gap-3'>
                  <div className="w-full">
                    <label htmlFor="location" className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      name="location"
                      placeholder='e.g. Rangpur'
                      className="input input-bordered w-full"
                      type="text"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="condition" className="label">
                      <span className="label-text">Condition</span>
                    </label>
                    <input
                      name="condition"
                      placeholder='e.g. fresh, used'
                      className="input input-bordered w-full"
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="usage" className="label">
                    <span className="label-text">Usage Time</span>
                  </label>
                  <input
                    name="usage"
                    placeholder='e.g. 1 month old'
                    className="input input-bordered w-full"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder='Describe your product'
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="seller_contact" className="label">
                    <span className="label-text">Contact Info</span>
                  </label>
                  <input
                    name="seller_contact"
                    className="input input-bordered w-full"
                    type="text"
                    required
                    placeholder=" +8801xxxx"
                  />
                </div>

                <div className="flex mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Add a Product
                  </button>
                </div>
              </form>
            </section>
        </div>
    );
};

export default CreateAProduct;