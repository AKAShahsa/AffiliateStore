import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Cart page doesn't exist yet, will be implemented later
// import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/category/:categoryId/:subcategoryId" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/cart" element={<NotFound />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
             <Route path="/terms-of-service" element={<TermsOfService />} />
             <Route path="/about" element={<About />} />
             <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
