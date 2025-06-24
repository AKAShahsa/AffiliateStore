
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Eye } from 'lucide-react';

interface Purchase {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing';
  total: number;
  items: {
    id: number;
    title: string;
    brand: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    // Mock purchase data
    const mockPurchases: Purchase[] = [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 179.98,
        items: [
          {
            id: 1,
            title: "Premium Yoga Mat - Non-Slip Exercise Mat",
            brand: "FitnessPro",
            price: 29.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: 2,
            title: "Adjustable Dumbbells Set - 50lbs",
            brand: "PowerFit",
            price: 149.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-01-20',
        status: 'shipped',
        total: 24.99,
        items: [
          {
            id: 3,
            title: "Resistance Bands Set - 11 Piece Kit",
            brand: "FlexFit",
            price: 24.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVubDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      }
    ];
    setPurchases(mockPurchases);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
          <p className="text-muted-foreground">
            View your order history and track deliveries
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No purchases yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
            <Link to="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order {purchase.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ordered on {formatDate(purchase.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(purchase.status)}>
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                      </Badge>
                      <p className="text-lg font-semibold mt-2">${purchase.total}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchase.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price}</p>
                          <Link to={`/product/${item.id}`}>
                            <Button variant="outline" size="sm" className="mt-2">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
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

export default Purchases;
