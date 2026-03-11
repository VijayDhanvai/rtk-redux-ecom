import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFromCart, clearCart } from "../../store/cartSlice";
import CartQty from "../CartQry";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  const total = items.reduce((sum, item) => {
    const priceNum =
      typeof item.price === "number"
        ? item.price
        : parseFloat(item.price || "0");
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <div className="p-8  max-w-275 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b border-gray-200 pb-2"
          >
            <div className="flex justify-center align-middle space-x-4">
              <img
                src={item.images[0] || "https://placehold.co/100"}
                alt={item.title || item.name || "Product"}
                className="w-16 h-16 object-cover  rounded-md border-gray-200   border-1"
              />
              <div className="font-medium">
                {item.title || item.name || "Product"}
                <div className="w-37.5">
                  <CartQty item={item} />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="font-medium">
                $
                {(
                  (typeof item.price === "number"
                    ? item.price
                    : parseFloat(item.price || "0")) * item.quantity
                ).toFixed(2)}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={() => dispatch(clearCart())}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
