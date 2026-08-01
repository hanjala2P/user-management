import { BsSearch } from "react-icons/bs";
import LatestProducts from "../LatesProducts/LatestProducts";
import { Suspense, useMemo } from "react";
import { Link } from "react-router";

const Home = () => {
  // useMemo keeps the same promise across re-renders — creating a new
  // fetch promise on every render breaks the `use()` hook in LatestProducts
  // (it keeps re-suspending, which is why Recent Products wasn't showing).
  const latestProductsPromise = useMemo(
    () => fetch('https://shopex-smart-deal-server.vercel.app/latestProducts').then(res => res.json()),
    []
  );

  return (
    <main className="">
      <section className="flex flex-col mt-6 gap-6 text-center items-center">
        <div className="text-4xl md:text-5xl lg:text-6xl">
            <h1  className="  font-bold text-center">Deal your <span className="text-primary">Produscts</span></h1>
        <h1 className="font-bold text-center">in a <span className="text-primary">Smart</span> way !</h1>
        </div>
        <p className="text-neutral-500 text-center px-12">SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
        <div className="flex border border-gray-400 rounded ">
            <input className="input w-xs lg:w-sm border-none" type="text" placeholder="search For Products, Categoriees..." />
            <button className="btn border-none rounded-l-none  bg-primary text-white"><BsSearch></BsSearch></button>
        </div>
        <div className="flex gap-6">
            <Link to="/allProducts" className="bg-primary text-white btn">Watch All Products</Link>
            <Link to="/createAProduct" className="btn text-primary border-primary">Post an Products</Link>
        </div>
      </section>
      {/* latest products cards sections */}
      <Suspense fallback={
        <div className="flex items-center justify-center text-primary mt-12">
         <span className="loading loading-ball loading-sm"></span>
         <span className="loading loading-ball loading-sm"></span>
         <span className="loading loading-ball loading-sm"></span>
        </div>
      }>
          <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
      </Suspense>
    </main>
  );
};

export default Home;