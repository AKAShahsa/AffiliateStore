
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated!</h3>
              <p className="text-white/90">Get the latest fitness deals and health tips delivered to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto max-w-md">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white text-gray-900"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">FitStore Pro</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in fitness. We curate the best fitness equipment and supplements to help you achieve your health goals.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Cardio Equipment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Strength Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Yoga & Pilates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Supplements</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Fitness Apparel</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300">support@fitstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-gray-300">123 Fitness St, Health City, HC 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © 2024 FitStore Pro. All rights reserved. | 
              <Link to="/privacy-policy" className="hover:text-primary ml-1">Privacy Policy</Link> | 
              <Link to="/terms-of-service" className="hover:text-primary ml-1">Terms of Service</Link>
            </div>
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>
                <span className="font-semibold">Affiliate Disclosure:</span> We earn from qualifying purchases made through our affiliate links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
