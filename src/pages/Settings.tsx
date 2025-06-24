import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const { user, updateUserProfile, updateUserNotifications } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: false,
    smsUpdates: false,
    pushNotifications: false,
    marketing: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
      setNotifications({
        emailUpdates: user.notifications?.emailUpdates ?? false,
        smsUpdates: user.notifications?.smsUpdates ?? false,
        pushNotifications: user.notifications?.pushNotifications ?? false,
        marketing: user.notifications?.marketing ?? false
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        name: formData.name,
        phone: formData.phone
      });
      await updateUserNotifications(notifications);
      toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to save changes', variant: 'destructive' });
    }
    setLoading(false);
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

        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive order updates via email</p>
                </div>
                <Switch
                  checked={notifications.emailUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('emailUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive order updates via SMS</p>
                </div>
                <Switch
                  checked={notifications.smsUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('smsUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser push notifications</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">Promotional emails and offers</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
