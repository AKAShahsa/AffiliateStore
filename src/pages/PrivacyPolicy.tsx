import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: June 1, 2024
          </p>
          
          <div className="prose prose-gray max-w-none">
            <p>
              At FitStore Pro, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account, make a purchase, sign up for our newsletter, or contact our customer service. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Billing and shipping information</li>
              <li>Payment details (processed securely through our payment processors)</li>
              <li>Account credentials</li>
              <li>Your preferences and interests</li>
              <li>Communications with us</li>
            </ul>
            
            <p>
              We also automatically collect certain information when you visit our website, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Usage data (pages visited, time spent on site, referring URLs)</li>
              <li>Location information</li>
              <li>Cookies and similar technologies</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Create and manage your account</li>
              <li>Provide customer support</li>
              <li>Send transactional emails and order updates</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Personalize your shopping experience</li>
              <li>Protect against fraud and unauthorized transactions</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities. Cookies are small text files stored on your device that help us provide you with a better browsing experience. They allow us to recognize your device, remember your preferences, analyze website traffic, and enable certain features of our website.
            </p>
            <p className="mt-4">
              You can manage your cookie preferences through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Service providers:</strong> Companies that help us operate our business, such as payment processors, shipping companies, and marketing partners</li>
              <li><strong>Affiliate partners:</strong> When you make a purchase through an affiliate link, we may share information with our affiliate partners</li>
              <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a new effective date.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4">
              <p>Email: privacy@fitstore.com</p>
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

export default PrivacyPolicy;