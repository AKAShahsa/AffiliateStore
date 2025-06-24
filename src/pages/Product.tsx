import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCarousel from '@/components/ProductCarousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Heart, ShoppingCart, ZoomIn, ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';
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
  description: string;
  specifications: Record<string, string>;
  faqs: { question: string; answer: string }[];
  features: string[];
}

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Use the same product data as Index page
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
      affiliateUrl: "https://amazon.com/dp/B123456?tag=youraffid-20",
      description: "Experience ultimate comfort and stability with our Premium Yoga Mat. Made from eco-friendly TPE material, this mat provides exceptional grip and cushioning for all your yoga practices. Whether you're a beginner or advanced practitioner, this mat will support your journey to wellness.",
      specifications: {
        "Material": "TPE (Thermoplastic Elastomer)",
        "Dimensions": "72\" x 24\" x 6mm",
        "Weight": "2.2 lbs",
        "Color Options": "Purple, Blue, Pink, Black",
        "Texture": "Non-slip textured surface",
        "Care Instructions": "Wipe clean with damp cloth"
      },
      faqs: [
        {
          question: "Is this mat suitable for hot yoga?",
          answer: "Yes, our Premium Yoga Mat is designed to handle moisture and maintains its grip even during intense hot yoga sessions."
        },
        {
          question: "How thick is the mat?",
          answer: "The mat is 6mm thick, providing optimal cushioning for your joints while maintaining stability for balance poses."
        },
        {
          question: "Is it eco-friendly?",
          answer: "Absolutely! Our mat is made from TPE material which is recyclable and free from PVC, latex, and harmful chemicals."
        }
      ],
      features: [
        "Superior grip technology",
        "Extra cushioning for joint protection",
        "Eco-friendly TPE material",
        "Lightweight and portable",
        "Easy to clean",
        "Comes with carrying strap"
      ]
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
      affiliateUrl: "https://amazon.com/dp/B789012?tag=youraffid-20",
      description: "Transform your home gym with our Adjustable Dumbbells Set. Each dumbbell adjusts from 5 to 50 pounds, replacing an entire rack of weights. Perfect for strength training, muscle building, and full-body workouts.",
      specifications: {
        "Weight Range": "5-50 lbs per dumbbell",
        "Material": "Cast iron with rubber coating",
        "Handle": "Ergonomic grip with knurled texture",
        "Adjustment": "Quick-lock dial system",
        "Dimensions": "17.5\" x 8\" x 9\"",
        "Total Weight": "100 lbs (both dumbbells)"
      },
      faqs: [
        {
          question: "How quickly can I change weights?",
          answer: "Our quick-lock dial system allows you to change weights in just 3 seconds with a simple turn of the dial."
        },
        {
          question: "Are these suitable for beginners?",
          answer: "Yes! The adjustable range from 5-50 lbs makes them perfect for beginners to advanced users."
        },
        {
          question: "Do they come with a warranty?",
          answer: "Yes, we provide a 2-year manufacturer warranty covering any defects in materials or workmanship."
        }
      ],
      features: [
        "Space-saving design",
        "Quick weight adjustment",
        "Durable construction",
        "Comfortable grip",
        "Replaces 20 pairs of dumbbells",
        "Compact storage"
      ]
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
      affiliateUrl: "https://amazon.com/dp/B345678?tag=youraffid-20",
      description: "Elevate your workout routine with our versatile Resistance Bands Set. This 11-piece kit includes varying resistance levels, allowing you to customize your workouts for different muscle groups. Perfect for strength training, physical therapy, and on-the-go workouts.",
      specifications: {
        "Material": "100% Natural Latex",
        "Resistance Levels": "5 bands ranging from 10 lbs to 50 lbs",
        "Attachments": "Foam handles, ankle straps, door anchor",
        "Carry Bag": "Included for easy storage and portability",
        "Band Length": "48 inches",
        "Total Weight": "1.2 lbs"
      },
      faqs: [
        {
          question: "Are these bands suitable for beginners?",
          answer: "Yes, our resistance bands come in varying resistance levels, making them perfect for beginners to advanced users."
        },
        {
          question: "Can I use these for physical therapy?",
          answer: "Absolutely! Resistance bands are commonly used in physical therapy to help rebuild strength and mobility."
        },
        {
          question: "Do they come with exercise guides?",
          answer: "Yes, we provide a detailed exercise guide with various workout routines to help you get started."
        }
      ],
      features: [
        "Full body workout",
        "Suitable for all fitness levels",
        "Portable and lightweight",
        "Durable and snap-resistant",
        "Comfortable grip",
        "Versatile attachments"
      ]
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
      affiliateUrl: "https://amazon.com/dp/B901234?tag=youraffid-20",
      description: "Experience the ultimate cardio workout with our Treadmill Pro X1. This folding electric treadmill features a powerful motor, adjustable incline, and a user-friendly console. Perfect for home workouts, weight loss, and improving cardiovascular health.",
      specifications: {
        "Motor": "2.5 HP",
        "Speed Range": "0.5 - 10 mph",
        "Incline": "0-12%",
        "Running Surface": "50\" x 18\"",
        "Display": "LCD with workout metrics",
        "Weight Capacity": "300 lbs"
      },
      faqs: [
        {
          question: "Is this treadmill easy to assemble?",
          answer: "Yes, our Treadmill Pro X1 comes partially assembled and includes easy-to-follow instructions for quick setup."
        },
        {
          question: "Does it have a heart rate monitor?",
          answer: "Yes, it features built-in heart rate sensors on the handlebars to track your pulse during workouts."
        },
        {
          question: "Is it suitable for small spaces?",
          answer: "Absolutely! The folding design allows you to save space when the treadmill is not in use."
        }
      ],
      features: [
        "Powerful motor",
        "Adjustable incline",
        "LCD display with workout metrics",
        "Folding design for easy storage",
        "Heart rate monitoring",
        "Safety key for emergency stop"
      ]
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
      affiliateUrl: "https://amazon.com/dp/B567890?tag=youraffid-20",
      description: "Fuel your workouts and support muscle recovery with our Protein Powder - Vanilla Whey. This 5lbs container provides a delicious and convenient way to meet your daily protein needs. Perfect for post-workout shakes, smoothies, and baking.",
      specifications: {
        "Flavor": "Vanilla",
        "Protein Source": "Whey Protein Concentrate",
        "Serving Size": "1 scoop (30g)",
        "Protein per Serving": "24g",
        "Calories per Serving": "120",
        "Allergens": "Contains Milk and Soy"
      },
      faqs: [
        {
          question: "Is this protein powder suitable for vegetarians?",
          answer: "Yes, our Vanilla Whey Protein Powder is suitable for vegetarians as it is derived from milk."
        },
        {
          question: "How many servings are in this container?",
          answer: "Each 5lbs container provides approximately 75 servings."
        },
        {
          question: "Can I use this for baking?",
          answer: "Absolutely! Our protein powder can be used in various baking recipes to increase protein content."
        }
      ],
      features: [
        "High-quality whey protein",
        "Delicious vanilla flavor",
        "Supports muscle recovery",
        "Easy to mix",
        "Versatile usage",
        "Great for post-workout shakes"
      ]
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
      affiliateUrl: "https://amazon.com/dp/B678901?tag=youraffid-20",
      description: "Upgrade your workout wardrobe with our Athletic Workout Set for men. This set includes a moisture-wicking t-shirt, breathable shorts, and comfortable compression pants. Perfect for gym workouts, running, and outdoor activities.",
      specifications: {
        "Material": "Polyester and Spandex blend",
        "Sizes": "S, M, L, XL",
        "Colors": "Black, Blue, Gray",
        "T-Shirt": "Short-sleeve, crew neck",
        "Shorts": "Elastic waistband, side pockets",
        "Compression Pants": "Full-length, moisture-wicking"
      },
      faqs: [
        {
          question: "Is this set suitable for running?",
          answer: "Yes, our Athletic Workout Set is designed with moisture-wicking fabric, making it perfect for running and other high-intensity activities."
        },
        {
          question: "How do I care for this set?",
          answer: "Machine wash cold, tumble dry low. Do not bleach or iron."
        },
        {
          question: "Are the compression pants tight-fitting?",
          answer: "Yes, the compression pants are designed to provide a snug and supportive fit."
        }
      ],
      features: [
        "Moisture-wicking fabric",
        "Breathable design",
        "Comfortable fit",
        "Versatile usage",
        "Stylish look",
        "Durable construction"
      ]
    }
  ];

  const relatedProducts = sampleProducts.filter(p => p.id !== parseInt(id || '0')).slice(0, 4);

  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === parseInt(id || '0'));
    setProduct(foundProduct || null);
  }, [id]);

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

  const handleWishlistClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        {/* Back Button */}
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className={`w-full h-96 object-cover rounded-lg cursor-zoom-in transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'hover:scale-105'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="flex space-x-4 py-4 border-y">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg"
                className="w-full"
                onClick={() => window.open(product.affiliateUrl, '_blank')}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now on Amazon
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={handleWishlistClick}>
                <Heart className={`h-5 w-5 mr-2 ${product && isInWishlist(product.id) ? 'text-red-500 fill-red-500' : ''}`} />
                {product && isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Affiliate Disclosure */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Affiliate Disclosure:</strong> We earn from qualifying purchases made through our affiliate links. This doesn't affect the price you pay.
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{product.rating}</div>
                      <div className="flex items-center justify-center">
                        {renderStars(product.rating)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {product.reviews.toLocaleString()} reviews
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Sarah M.", rating: 5, comment: "Excellent quality! Exactly what I was looking for.", date: "2 days ago" },
                      { name: "Mike D.", rating: 4, comment: "Great product, fast shipping. Highly recommended.", date: "1 week ago" },
                      { name: "Emma L.", rating: 5, comment: "Perfect for my home workouts. Love it!", date: "2 weeks ago" }
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{review.name}</span>
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faqs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {product.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <ProductCarousel
          title="Related Products"
          subtitle="You might also like these products"
          products={relatedProducts}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Product;
