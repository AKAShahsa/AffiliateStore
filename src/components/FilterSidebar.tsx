import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Star, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  onFiltersChange: (filters: {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
    rating: number;
  }) => void;
}

const FilterSidebar = ({ onFiltersChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const categories = [
    { id: 'cardio', name: 'Cardio Equipment', count: 245 },
    { id: 'strength', name: 'Strength Training', count: 189 },
    { id: 'yoga', name: 'Yoga & Pilates', count: 156 },
    { id: 'accessories', name: 'Accessories', count: 312 },
    { id: 'supplements', name: 'Supplements', count: 98 },
    { id: 'apparel', name: 'Fitness Apparel', count: 203 }
  ];

  const brands = [
    { id: 'fitnesspro', name: 'FitnessPro', count: 45 },
    { id: 'powerfit', name: 'PowerFit', count: 38 },
    { id: 'flexfit', name: 'FlexFit', count: 29 },
    { id: 'stronglife', name: 'StrongLife', count: 31 },
    { id: 'yogamaster', name: 'YogaMaster', count: 22 }
  ];

  // Notify parent component when filters change
  useEffect(() => {
    onFiltersChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: priceRange as [number, number],
      rating: selectedRating
    });
  }, [selectedCategories, selectedBrands, priceRange, selectedRating, onFiltersChange]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    }
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(selectedRating === rating ? 0 : rating);
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(0);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => handleRatingChange(index + 1) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={category.id}
                  className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">({category.count})</span>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => 
                    handleBrandChange(brand.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={brand.id}
                  className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
                >
                  <span>{brand.name}</span>
                  <span className="text-muted-foreground">({brand.count})</span>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center space-x-2 cursor-pointer hover:bg-accent rounded-md p-1 -m-1"
                onClick={() => handleRatingChange(rating)}
              >
                <Checkbox
                  checked={selectedRating === rating}
                />
                <div className="flex items-center space-x-1">
                  {renderStars(rating)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {rating === 5 ? '& Up' : `${rating} & Up`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
