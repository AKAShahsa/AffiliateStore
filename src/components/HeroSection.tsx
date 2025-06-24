import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hero search:', searchQuery);
  };

  return (
    <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight relative inline-block">
                Transform Your
                <span className="text-primary block relative">
                  Fitness Journey
                  <span className="block absolute left-1/2 -translate-x-1/2 w-full h-6 lg:h-8" style={{bottom: '-0.5em'}} aria-hidden="true">
                    <svg viewBox="0 0 340 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M10 20 Q 90 40 170 15 Q 250 -10 330 20" stroke="#22c55e" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover premium fitness equipment and accessories to help you achieve your health goals. Quality gear for every fitness level.
              </p>
              <p className="text-lg text-muted-foreground max-w-lg font-medium">
                We find the best reviewed quality products for you from all of the market.
              </p>
            </div>

            {/* Hero Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md">
              <Input
                type="text"
                placeholder="Search for fitness products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Button type="submit" className="absolute right-1 top-1 h-10 px-6">
                Search
              </Button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 py-6 text-base">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-base">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Fitness Equipment"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-background rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs font-bold">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">Orders over $50</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-background rounded-lg shadow-lg p-4 border">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">30 Day</div>
                <div className="text-xs text-muted-foreground">Money Back Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
