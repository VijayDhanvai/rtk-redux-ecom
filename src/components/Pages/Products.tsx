import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../services/productsApi";
import ProductsFilters from "../ProductsFilters";
 import { filterByPriceRange } from "../../store/filtersSlice";
  
export default function Products() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductsQuery({});
  console.log("data:", data);
  
    
 if(!isLoading) {
    const MIN =
   data?.products && data.products.length > 0
   ? Math.min(...data.products.map((p: { price: any; }) => p.price))
   : 0;
   
   const MAX =
   data?.products && data.products.length > 0
   ? Math.max(...data.products.map((p: { price: any; }) => p.price))
   : 0;
   
   dispatch(filterByPriceRange({ min: MIN , max: MAX }));
  }

 
  return (
    <div className="bg-white">
      <ProductsFilters products={data?.products || []} error={error} isLoading={isLoading} />
    </div>
  );
}
