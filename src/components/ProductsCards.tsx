import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import CartQty from "./CartQry";
import { addToCart } from "../store/cartSlice";

function ProductsCards({ products, error, isLoading }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: any) => state.cart.items);
  return (
    <div className="mx-auto  ">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2>

      {error ? (
        <div className="mt-6 text-center text-red-600">
          <p>Oh no, there was an error loading products</p>
        </div>
      ) : isLoading ? (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : products && products.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product: any) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt}
                src={product.images[0]}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="absolute left-2 top-2 z-20 flex items-center space-x-1 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 shadow">

                <p className="mt-0 text-sm capitalize text-sky-600 text-gray-500">
                    {product.category} 
                  </p>
                   
              </div>
                  
              <div className="absolute right-2 top-2 z-20 flex items-center space-x-1 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 shadow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-yellow-400">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.11 9.392c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69L9.05 2.927z" />
                </svg>
                <span>{  product.rating}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <div className=" w-full">
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.shippingInformation}
                  </p>
                  <div className="flex items-center w-full space-x-2 space-between">

                
                   <p className="text-sm font-medium text-green-500">
                   Discount :  {product.discountPercentage}%  
                  </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price} 
                </p>
               
              </div>

              {cartItems.find((item: any) => item.id === product.id) ? (
                <div className="mt-2">
                  <CartQty
                    item={cartItems.find((item: any) => item.id === product.id)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="cursor-pointer relative z-50 mt-2 w-full rounded bg-blue-600 px-4 py-1 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add to cart
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-600">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}

export default ProductsCards;
