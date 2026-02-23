import { useGetProductsQuery } from "../../services/productsApi"

export default function Products() {
  const { data, error, isLoading } = useGetProductsQuery({});
  console.log('data:', data);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        {error ? (
          <div className="mt-6 text-center text-red-600">
            <p>Oh no, there was an error loading products</p>
          </div>
        ) : isLoading ? (
          <div className="mt-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : data.products && data.products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.products.map((product: any) => (
              <div key={product.id} className="group relative">
                <img
                  alt={product.imageAlt}
                  src={product.images[0]}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.shippingInformation}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-600">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
