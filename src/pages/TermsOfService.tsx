import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: June 1, 2024
          </p>
          
          <div className="prose prose-gray max-w-none">
            <p>
              Welcome to FitStore Pro. These Terms of Service ("Terms") govern your access to and use of our website, products, and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Account Registration</h2>
            <p>
              To access certain features of our website, you may need to register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Purchases and Payments</h2>
            <p>
              When you make a purchase through our website, you agree to provide valid payment information. All prices are displayed in the applicable currency and do not include taxes or shipping fees, which will be added at checkout. We reserve the right to change prices at any time without notice.
            </p>
            <p className="mt-4">
              <strong>Affiliate Disclosure:</strong> Our website contains affiliate links. When you click on these links and make a purchase, we may receive a commission at no additional cost to you. These affiliate relationships do not affect our product recommendations or reviews.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Shipping and Returns</h2>
            <p>
              As an affiliate store, we do not directly ship products. All purchases made through our affiliate links will be processed and shipped by the respective merchant. Shipping times, methods, and costs are determined by these merchants. Similarly, all returns, refunds, and exchanges are subject to the policies of the merchant from whom you purchased the product.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              You may have the opportunity to post reviews, comments, or other content on our website. By submitting content, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
            </p>
            <p className="mt-4">
              You represent and warrant that you own or control all rights to the content you post, that the content is accurate, and that use of the content does not violate these Terms or cause injury to any person or entity.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Prohibited Activities</h2>
            <p>
              You agree not to engage in any of the following activities:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on the intellectual property rights of others</li>
              <li>Submitting false or misleading information</li>
              <li>Using our website for any illegal or unauthorized purpose</li>
              <li>Interfering with or disrupting the operation of our website</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Collecting user information without consent</li>
              <li>Engaging in any activity that could damage, disable, or impair our website</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is our property or the property of our licensors and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              OUR WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-4">
              We do not guarantee that our website will be uninterrupted, secure, or error-free, or that defects will be corrected. We are not responsible for the accuracy, quality, or reliability of any information or content on our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF OUR WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="mt-4">
              Our total liability for any claims arising under these Terms shall not exceed the amount paid by you, if any, for accessing our website or services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless FitStore Pro and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to your violation of these Terms or your use of our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to our website at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time by posting the revised terms on our website. Your continued use of our website after any such changes constitutes your acceptance of the new Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved exclusively in the courts located within the United States.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms, please contact us at:
            </p>
            <div className="mt-4">
              <p>Email: legal@fitstore.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Fitness St, Health City, HC 12345</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;