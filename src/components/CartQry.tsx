import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../store/cartSlice";

function CartQty({item}: any) {

   const dispatch = useDispatch();

  return (
     <div className="flex z-50 relative w-full  justify-between mt-1 border border-gray-300 rounded-xl   overflow-hidden">
      <button onClick={() => dispatch(decreaseQuantity(item.id))}
        className="px-2 w-9  cursor-pointer py-0.5 text-md font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        −
      </button>

      <div className="px-3 flex-1 text-center   py-0.5 text-md font-medium text-gray-800 border-x border-gray-300">
        {item?.quantity} 
      </div>

      <button
        onClick={() => dispatch(increaseQuantity(item.id))}
        className="px-2 w-9  cursor-pointer py-0.5 text-md font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        +
      </button>
    </div>
  )
}

export default CartQty