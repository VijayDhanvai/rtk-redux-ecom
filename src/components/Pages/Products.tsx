import { useGetProductsQuery } from "../../services/productsApi";
import ProductsFilters from "../ProductsFilters";
  
export default function Products() {
  const { data, error, isLoading } = useGetProductsQuery({});
  console.log("data:", data);
 

  return (
    <div className="bg-white">
      <ProductsFilters products={data?.products || []} error={error} isLoading={isLoading} />
    </div>
  );
}
