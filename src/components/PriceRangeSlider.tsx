import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
 
export default function PriceRangeSlider({  handleRangeSlider }: any) {
   
  const filters = useSelector((state: any) => state.filters);
    
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.minPrice, filters.maxPrice]);
  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice])
  

  const handleMinChange = (value: number) => {
    if (value < priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
      handleRangeSlider([value, priceRange[1]]);
      
    }
  };

  const handleMaxChange = (value: number) => {
    
    if (value > priceRange[0]) {
      setPriceRange([priceRange[0], value]);
      handleRangeSlider([priceRange[0], value]);
    }
  };

  const minPercent = ((priceRange[0] - filters.minPrice) / (filters.maxPrice - filters.minPrice)) * 100;
  const maxPercent = ((priceRange[1] - filters.minPrice) / (filters.maxPrice - filters.minPrice)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-700 mb-3">
        <span>Min: ${priceRange[0]}</span>
        <span>Max: ${priceRange[1]}</span>
      </div>

      <div className="relative h-2">
        {/* Background track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-md" />

        {/* Active range */}
        <div
          className="absolute h-2 bg-blue-600 rounded-md max-w-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Range Input */}
        <input
          type="range"
          min={filters.minPrice}
          max={filters.maxPrice}
          value={priceRange[0]}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={filters.minPrice}
          max={filters.maxPrice}
          value={priceRange[1]}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
        />
      </div>
    </div>
  );
}