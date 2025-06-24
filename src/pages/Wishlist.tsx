import { useWishlist } from '../hooks/useWishlist';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  affiliateUrl: string;
}

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding products you love!</p>
            <Link to="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg cursor-pointer hover:scale-105 transition-transform"
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="text-sm text-muted-foreground font-medium">
                      {item.brand}
                    </div>
                    
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground line-clamp-2 leading-tight hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => window.open(item.affiliateUrl, '_blank')}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
