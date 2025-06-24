import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Filter } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  categories: string[];
  image: string;
  affiliateUrl: string;
}

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 500] as [number, number],
    rating: 0
  });
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Sample product data
  const sampleProducts: Product[] = [
    {
      id: 1,
      title: "Premium Yoga Mat - Non-Slip Exercise Mat",
      brand: "FitnessPro",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviews: 1234,
      categories: ["yoga", "accessories"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B123456?tag=youraffid-20"
    },
    {
      id: 2,
      title: "Adjustable Dumbbells Set - 50lbs",
      brand: "PowerFit",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 856,
      categories: ["strength", "accessories"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B789012?tag=youraffid-20"
    },
    {
      id: 3,
      title: "Resistance Bands Set - 11 Piece Kit",
      brand: "FlexFit",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.3,
      reviews: 2103,
      categories: ["strength", "accessories"],
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B345678?tag=youraffid-20"
    },
    {
      id: 4,
      title: "Treadmill Pro X1 - Folding Electric",
      brand: "CardioMax",
      price: 899.99,
      originalPrice: 1199.99,
      rating: 4.6,
      reviews: 542,
      categories: ["cardio"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B901234?tag=youraffid-20"
    },
    {
      id: 5,
      title: "Protein Powder - Vanilla Whey 5lbs",
      brand: "NutriMax",
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.4,
      reviews: 3421,
      categories: ["supplements"],
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B567890?tag=youraffid-20"
    },
    {
      id: 6,
      title: "Athletic Workout Set - Men's",
      brand: "SportWear",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.2,
      reviews: 876,
      categories: ["apparel"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B678901?tag=youraffid-20"
    },
    {
      id: 7,
      title: "Yoga Block Set - Cork Material",
      brand: "YogaMaster",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.7,
      reviews: 532,
      categories: ["yoga", "accessories"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B678902?tag=youraffid-20"
    },
    {
      id: 8,
      title: "Exercise Bike - Indoor Cycling",
      brand: "CardioMax",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.5,
      reviews: 423,
      categories: ["cardio"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      affiliateUrl: "https://amazon.com/dp/B678903?tag=youraffid-20"
    }
  ];

  // Initialize with category filter based on URL params
  useEffect(() => {
    // Set initial category filter based on URL params
    if (categoryId) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryId]
      }));
    }

    // Set products
    setProducts(sampleProducts);
  }, [categoryId]);

  // Filter products based on current filters and URL params
  useEffect(() => {
    let filtered = products;

    // Filter by category from URL params first
    if (categoryId) {
      filtered = filtered.filter(product => product.categories.includes(categoryId));
    }

    // Apply additional filters from FilterSidebar
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        product.categories.some(cat => filters.categories.includes(cat))
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => {
        const brandId = product.brand.toLowerCase().replace(/\s+/g, '');
        return filters.brands.includes(brandId);
      });
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    setFilteredProducts(filtered);
  }, [products, filters, categoryId, subcategoryId]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Get category name for display
  const getCategoryName = () => {
    const categories = {
      'cardio': 'Cardio Equipment',
      'strength': 'Strength Training',
      'yoga': 'Yoga & Pilates',
      'accessories': 'Accessories',
      'supplements': 'Supplements',
      'apparel': 'Fitness Apparel'
    };
    
    return categoryId ? categories[categoryId as keyof typeof categories] || 'Products' : 'All Products';
  };

  // Render stars for product rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleWishlistClick = (product: Product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{getCategoryName()}</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-64 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar onFiltersChange={handleFiltersChange} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </Link>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${product.id}`} className="block flex-1">
                        <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 flex-shrink-0" onClick={() => handleWishlistClick(product)}>
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'text-red-500 fill-red-500' : ''}`} />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">{product.brand}</div>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or browse other categories</p>
                <Button onClick={() => setFilters({
                  categories: categoryId ? [categoryId] : [],
                  brands: [],
                  priceRange: [0, 500],
                  rating: 0
                })}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;