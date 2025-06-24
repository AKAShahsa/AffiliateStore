import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Menu, X, Search, ShoppingCart, User, Heart, Settings, ChevronRight, ChevronDown, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
  
  // Product categories structure
  const categories = [
    {
      name: 'Cardio Equipment',
      id: 'cardio',
      subcategories: [
        { name: 'Treadmills', id: 'treadmills' },
        { name: 'Exercise Bikes', id: 'exercise-bikes' },
        { name: 'Ellipticals', id: 'ellipticals' },
        { name: 'Rowing Machines', id: 'rowing-machines' }
      ]
    },
    {
      name: 'Strength Training',
      id: 'strength',
      subcategories: [
        { name: 'Dumbbells', id: 'dumbbells' },
        { name: 'Barbells', id: 'barbells' },
        { name: 'Weight Benches', id: 'weight-benches' },
        { name: 'Home Gyms', id: 'home-gyms' }
      ]
    },
    {
      name: 'Yoga & Pilates',
      id: 'yoga',
      subcategories: [
        { name: 'Yoga Mats', id: 'yoga-mats' },
        { name: 'Yoga Blocks', id: 'yoga-blocks' },
        { name: 'Resistance Bands', id: 'resistance-bands' },
        { name: 'Pilates Equipment', id: 'pilates-equipment' }
      ]
    },
    {
      name: 'Accessories',
      id: 'accessories',
      subcategories: [
        { name: 'Fitness Trackers', id: 'fitness-trackers' },
        { name: 'Gym Bags', id: 'gym-bags' },
        { name: 'Water Bottles', id: 'water-bottles' },
        { name: 'Workout Gloves', id: 'workout-gloves' }
      ]
    },
    {
      name: 'Supplements',
      id: 'supplements',
      subcategories: [
        { name: 'Protein Powder', id: 'protein-powder' },
        { name: 'Pre-Workout', id: 'pre-workout' },
        { name: 'Vitamins', id: 'vitamins' },
        { name: 'Weight Gainers', id: 'weight-gainers' }
      ]
    },
    {
      name: 'Fitness Apparel',
      id: 'apparel',
      subcategories: [
        { name: 'Men\'s Clothing', id: 'mens-clothing' },
        { name: 'Women\'s Clothing', id: 'womens-clothing' },
        { name: 'Shoes', id: 'shoes' },
        { name: 'Accessories', id: 'apparel-accessories' }
      ]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Handle search functionality - will be implemented later
  };

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/');
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FF</span>
            </div>
            <span className="font-bold text-xl text-primary">FitFlex Store</span>
          </RouterLink>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-6">
              {/* Regular nav items */}
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <RouterLink
                    to={item.href}
                    className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                  >
                    {item.name}
                  </RouterLink>
                </NavigationMenuItem>
              ))}
              
              {/* Products dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent inline-flex items-center gap-1">
                      Products
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[500px] p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <RouterLink 
                            to={`/category/${category.id}`} 
                            className="font-medium text-foreground hover:text-primary transition-colors block"
                            onClick={() => navigate(`/category/${category.id}`)}
                          >
                            {category.name}
                          </RouterLink>
                          <ul className="space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <li key={subcategory.id}>
                                <RouterLink 
                                  to={`/category/${category.id}/${subcategory.id}`}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                  onClick={() => navigate(`/category/${category.id}/${subcategory.id}`)}
                                >
                                  <ChevronRight className="h-3 w-3" />
                                  {subcategory.name}
                                </RouterLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search fitness products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <RouterLink to="/wishlist">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </RouterLink>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {/* Profile Dropdown or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL} alt={user.name} />
                      <AvatarFallback>{user.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center space-x-2 px-4 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL} alt={user.name} />
                      <AvatarFallback>{user.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <RouterLink to="/profile">My Profile</RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/wishlist">My Wishlist</RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/purchases">My Purchases</RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/settings">Account Settings</RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <RouterLink to="/login">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </RouterLink>
            )}
            
            {/* CTA Button */}
            {!user && (
              <RouterLink to="/register">
                <Button className="hidden md:flex ml-4">
                  Sign Up
                </Button>
              </RouterLink>
            )}

            {/* Mobile Menu Toggle */}
            {!mobileMenuOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t fixed inset-0 z-50 bg-background overflow-y-auto transition-all duration-300 w-full h-screen">
            <div className="flex justify-end px-4 pb-2 w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="space-y-4 px-4 pb-8 w-full">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search fitness products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <RouterLink
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </RouterLink>
                ))}
                
                {/* Mobile Products Categories */}
                <div className="pt-2 border-t">
                  <p className="px-3 py-2 font-medium">Product Categories</p>
                  <div className="space-y-1 pl-3">
                    {categories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <RouterLink
                          to={`/category/${category.id}`}
                          className="block px-3 py-1 text-foreground hover:text-primary transition-colors font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name}
                        </RouterLink>
                        <div className="pl-4 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <RouterLink
                              key={subcategory.id}
                              to={`/category/${category.id}/${subcategory.id}`}
                              className="block px-3 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subcategory.name}
                            </RouterLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Mobile Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <RouterLink to="/wishlist" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </RouterLink>
                <Button variant="outline" size="sm" className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
                {!user ? (
                  <RouterLink to="/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </RouterLink>
                ) : (
                  <RouterLink to="/profile" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Avatar className="h-4 w-4 mr-2">
                        <AvatarImage src={user.photoURL} alt={user.name} />
                        <AvatarFallback>{user.name?.[0] || '?'}</AvatarFallback>
                      </Avatar>
                      Profile
                    </Button>
                  </RouterLink>
                )}
              </div>
              
              {!user && (
                <RouterLink to="/register">
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </RouterLink>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
