import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Heart as HeartIcon, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  products: Product[];
}

const ProductCarousel = ({ title, subtitle, products }: ProductCarouselProps) => {
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

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

  const handleQuickView = (productId: number) => {
    console.log('Quick view:', productId);
    // Implement quick view functionality
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Product Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                      
                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      
                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white z-20 pointer-events-auto"
                        onClick={(e) => { e.stopPropagation(); handleWishlistClick(product); }}
                      >
                        <HeartIcon className={`h-4 w-4 ${isInWishlist(product.id) ? 'text-red-500 fill-red-500' : ''}`} />
                      </Button>
                      
                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link to={`/product/${product.id}`}>
                          <Button
                            variant="secondary"
                            className="transform scale-95 group-hover:scale-100 transition-transform duration-300"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      {/* Brand */}
                      <div className="text-sm text-muted-foreground font-medium">
                        {product.brand}
                      </div>
                      
                      {/* Title */}
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight hover:text-primary transition-colors cursor-pointer">
                          {product.title}
                        </h3>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews.toLocaleString()})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Buy Button */}
                      <Button 
                        className="w-full mt-4"
                        onClick={() => window.open(product.affiliateUrl, '_blank')}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
