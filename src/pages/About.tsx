import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Star, Award, ShoppingBag, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About FitStore Pro</h1>
              <p className="text-xl opacity-90 mb-8">
                Your trusted source for premium fitness equipment and supplements
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center bg-white text-primary hover:bg-gray-100 transition-colors px-6 py-3 rounded-full font-medium"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Our Products
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
              <p className="text-lg leading-relaxed mb-6">
                At FitStore Pro, we're passionate about helping you achieve your fitness goals with the best equipment and supplements available. We understand the overwhelming number of options in the market, which is why we've made it our mission to curate only the highest quality products that truly deliver results.
              </p>
              <p className="text-lg leading-relaxed">
                We meticulously analyze thousands of products on Amazon, considering ratings, price points, and authentic customer reviews to bring you a selection that represents the best value for your fitness journey. Our goal is simple: to be your trusted advisor in finding fitness products that actually work.
              </p>
            </div>
          </div>
        </section>
        
        {/* What We Offer */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-card rounded-xl p-8 shadow-md border border-border flex flex-col items-center text-center transition-all hover:shadow-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Curated Selection</h3>
                <p className="text-muted-foreground">
                  We analyze thousands of products and only feature those with exceptional ratings and reviews. Every product on our site has been carefully selected based on quality, durability, and effectiveness.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-card rounded-xl p-8 shadow-md border border-border flex flex-col items-center text-center transition-all hover:shadow-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Best Value</h3>
                <p className="text-muted-foreground">
                  We compare prices across multiple sellers to ensure you're getting the best deal. Our focus is on finding products that offer the perfect balance between quality and affordability.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-card rounded-xl p-8 shadow-md border border-border flex flex-col items-center text-center transition-all hover:shadow-lg">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Honest Recommendations</h3>
                <p className="text-muted-foreground">
                  We only recommend products we believe in. Our detailed descriptions and specifications help you make informed decisions about which products will best suit your fitness needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product Categories */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Product Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <Link to="/category/home-gym-equipment" className="group">
              <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all group-hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Home Gym</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Home Gym Equipment</h3>
                  <p className="text-sm text-muted-foreground">Quality equipment for your home workout space</p>
                </div>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link to="/category/cardio" className="group">
              <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all group-hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Cardio</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Cardio Equipment</h3>
                  <p className="text-sm text-muted-foreground">Treadmills, bikes, and more for heart-pumping workouts</p>
                </div>
              </div>
            </Link>
            
            {/* Category 3 */}
            <Link to="/category/supplements" className="group">
              <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all group-hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Supplements</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Supplements</h3>
                  <p className="text-sm text-muted-foreground">Protein, pre-workout, and nutritional support</p>
                </div>
              </div>
            </Link>
            
            {/* Category 4 */}
            <Link to="/category/boxing-accessories" className="group">
              <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border transition-all group-hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Boxing</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Boxing Accessories</h3>
                  <p className="text-sm text-muted-foreground">Gloves, bags, and equipment for boxing enthusiasts</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
        
        {/* Meet the Team */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Founder */}
              <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-border">
                <div className="h-64 bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                  <Users className="h-24 w-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Syed Taha</h3>
                  <p className="text-primary font-medium mb-4">Founder</p>
                  <p className="text-muted-foreground">
                    A fitness enthusiast with a passion for helping others find the right equipment for their journey. Taha founded FitStore Pro with the vision of creating a trusted resource for fitness product recommendations.
                  </p>
                </div>
              </div>
              
              {/* Co-Founder */}
              <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-border">
                <div className="h-64 bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
                  <Users className="h-24 w-24 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Syed Talal</h3>
                  <p className="text-primary font-medium mb-4">Co-Founder</p>
                  <p className="text-muted-foreground">
                    With expertise in product research and analysis, Talal ensures that every product featured on FitStore Pro meets our strict quality standards. His attention to detail helps us find the hidden gems in the fitness market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Selection Process</h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Research</h3>
                  <p className="text-muted-foreground">
                    We start by identifying the most popular and highly-rated fitness products across various categories on Amazon. Our initial research focuses on products with at least 4-star ratings and substantial review counts.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Review Analysis</h3>
                  <p className="text-muted-foreground">
                    We dive deep into customer reviews, looking beyond the star ratings to understand real user experiences. We pay special attention to durability, effectiveness, ease of use, and customer service experiences.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Price Comparison</h3>
                  <p className="text-muted-foreground">
                    We compare prices across multiple sellers and track price histories to ensure we're recommending products that offer genuine value. We look for the sweet spot where quality meets affordability.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex items-start gap-6">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Final Selection</h3>
                  <p className="text-muted-foreground">
                    Only products that pass our rigorous evaluation process make it to our store. We regularly update our selections to ensure we're always featuring the best current options in each category.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Fitness Journey?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Explore our carefully curated selection of fitness equipment and supplements, handpicked to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="bg-white text-primary hover:bg-gray-100 transition-colors px-6 py-3 rounded-full font-medium inline-flex items-center justify-center"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-6 py-3 rounded-full font-medium inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;