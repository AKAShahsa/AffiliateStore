
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCarousel from '@/components/ProductCarousel';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import Footer from '@/components/Footer';

const Index = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<typeof sampleProducts>([]);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 500] as [number, number],
    rating: 0
  });

  // Enhanced sample product data with more products and proper IDs
  const sampleProducts = [
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
    }
  ];

  // Filter products based on current filters
  const filterProducts = (products: typeof sampleProducts) => {
    return products.filter(product => {
      // Category filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = product.categories.some(cat => 
          filters.categories.includes(cat)
        );
        if (!hasMatchingCategory) return false;
      }

      // Brand filter
      if (filters.brands.length > 0) {
        const brandId = product.brand.toLowerCase().replace(/\s+/g, '');
        if (!filters.brands.includes(brandId)) return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    });
  };

  // Update filtered products when filters change
  useEffect(() => {
    setFilteredProducts(filterProducts(sampleProducts));
  }, [filters]);

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(sampleProducts);
  }, []);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
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
                  className="w-full"
                >
                  {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Product Carousels */}
              <div className="space-y-12">
                <ProductCarousel
                  title="🔥 Top Rated Products"
                  subtitle="Best selling fitness equipment this month"
                  products={filteredProducts.filter(p => p.rating >= 4.5)}
                />
                
                <ProductCarousel
                  title="✨ New Arrivals"
                  subtitle="Latest fitness gear just added"
                  products={filteredProducts.slice(0, 4)}
                />
                
                <ProductCarousel
                  title="⚖️ Weight Loss"
                  subtitle="Products to help you achieve your weight loss goals"
                  products={filteredProducts.filter(p => 
                    p.categories.some(cat => ['yoga', 'cardio'].includes(cat))
                  )}
                />
                
                <ProductCarousel
                  title="💊 Gym Supplements"
                  subtitle="Enhance your performance and recovery"
                  products={filteredProducts.filter(p => 
                    p.categories.includes('supplements')
                  )}
                />
                
                <ProductCarousel
                  title="🥊 Boxing Accessories"
                  subtitle="Equipment for boxing and combat sports"
                  products={filteredProducts.filter(p => 
                    p.categories.some(cat => ['accessories'].includes(cat))
                  )}
                />
                
                <ProductCarousel
                  title="🏋️ Gym Accessories"
                  subtitle="Essential equipment for your workout"
                  products={filteredProducts.filter(p => 
                    p.categories.some(cat => ['accessories', 'strength'].includes(cat))
                  )}
                />
                
                <ProductCarousel
                  title="💪 Best Sellers"
                  subtitle="Most popular items among fitness enthusiasts"
                  products={filteredProducts}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;
