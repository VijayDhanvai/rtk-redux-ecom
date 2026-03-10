"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, filterByRating } from "../store/filtersSlice";
import ProductsCards from "./ProductsCards";
import PriceRangeSlider from "./PriceRangeSlider";

const sortOptions = [
  { name: "Most Discount",  current: true },
  { name: "Best Rating",  current: false },
  { name: "Newest",  current: false },
  { name: "Price: Low to High",  current: false },
  { name: "Price: High to Low",  current: false },
];

const filtersRating = [
  { name: "4 Stars & up", value: 4 },
  { name: "3 Stars & up", value: 3 },
  { name: "2 Stars & up", value: 2 },
  { name: "1 Star & up", value: 1 },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsFilters({ products, error, isLoading }: any) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filtersCat = useSelector((state: any) => state.filters);
  const filersRating = useSelector((state: any) => state.filters);
  const [sortBy, setSortBy] = useState(sortOptions[0].name);
  const [rengeSelected, setRengeSelected] = useState([
    filersRating.minPrice,
    filersRating.maxPrice,
  ]);
  const dispatch = useDispatch();
  let uniqueCategories: any[] = ["All"];

  products.map((item: any) => {
    if (item.category && !uniqueCategories.includes(item.category)) {
      uniqueCategories.push(item.category);
    }
  });

  function handleRangeSlider(priceRange: any) {
    setRengeSelected(priceRange);
  }

 
  const filteredData = products.filter((product: any) => {
    return (
      (product.category === filtersCat.category ||
        filtersCat.category === "All") &&
      (product.rating >= filersRating.rating || filersRating.rating === null)
    );
  });

  const priceFilteredData = filteredData.filter((product: any) => {
    return (
      product.price >= rengeSelected[0] && product.price <= rengeSelected[1]
    );
  });
  
  const handleSort = (sortBy: string) => {
    setSortBy(sortBy);
     switch (sortBy) {
      case "Most Discount":
        priceFilteredData.sort((a: any, b: any) => b.discountPercentage - a.discountPercentage);
        break;
      case "Best Rating":
        priceFilteredData.sort((a: any, b: any) => b.rating - a.rating);
        break;
      default:
        break; 
     }
  };

  useEffect(() => {
    handleSort(sortBy);
  }, [sortBy]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {uniqueCategories.map((category) => (
                    <li key={category}>
                      <span className="block px-2 py-3">{category}</span>
                    </li>
                  ))}
                </ul>
                {/* Rating filter (mobile UI only) */}
                <div className="border-t border-gray-100 px-4 py-4">
                  <h3 className="text-sm font-medium text-gray-900">Rating</h3>
                  <fieldset className="mt-3 space-y-3">
                    <label className="flex items-center text-sm text-gray-700">
                      <input
                        type="radio"
                        name="rating"
                        value="4"
                        className="mr-3 h-4 w-4 text-indigo-600"
                      />
                      <span>4 Stars & up</span>
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input
                        type="radio"
                        name="rating"
                        value="3"
                        className="mr-3 h-4 w-4 text-indigo-600"
                      />
                      <span>3 Stars & up</span>
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input
                        type="radio"
                        name="rating"
                        value="2"
                        className="mr-3 h-4 w-4 text-indigo-600"
                      />
                      <span>2 Stars & up</span>
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input
                        type="radio"
                        name="rating"
                        value="1"
                        className="mr-3 h-4 w-4 text-indigo-600"
                      />
                      <span>1 Star & up</span>
                    </label>
                  </fieldset>
                </div>

                {/* Pricing (mobile UI only) */}
                <div className="border-t border-gray-100 px-4 py-4">
                  <h3 className="text-sm font-medium text-gray-900">Price</h3>
                  <div className="mt-3">
                    <PriceRangeSlider />
                  </div>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-5">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-4 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                         onClick={() => handleSort(option.name)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden",
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Categories
                </h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {uniqueCategories.map((category) => (
                    <li key={category} className="m-0 p-0">
                      <span
                        onClick={() => dispatch(filterByCategory(category))}
                        className={`block px-2 py-2 border-gray-100 border-b capitalize cursor-pointer ${category === filtersCat.category ? " bg-blue-50 text-blue-700" : ""}`}
                      >
                        {category}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Rating filter (desktop UI only) */}
                <div className="  border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900">Rating</h3>
                  <fieldset className="mt-3 space-y-3 text-sm text-gray-700">
                    {filtersRating.map((rating) => (
                      <label
                        className="flex items-center"
                        key={rating.value}
                        onClick={() => dispatch(filterByRating(rating.value))}
                      >
                        <input
                          type="radio"
                          name="rating-desktop"
                          value={rating.value}
                          className="mr-3 h-4 w-4 text-indigo-600"
                        />
                        <span>{rating.name}</span>
                      </label>
                    ))}
                  </fieldset>
                </div>
                {/* Pricing (desktop UI only) */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900">Price</h3>
                  <div className="mt-3">
                    <PriceRangeSlider
                      products={filteredData}
                      handleRangeSlider={(priceRange: any) =>
                        handleRangeSlider(priceRange)
                      }
                    />
                  </div>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductsCards
                  products={priceFilteredData}
                  error={error}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
