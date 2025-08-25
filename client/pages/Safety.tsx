import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { 
  Shield, 
  Phone, 
  MapPin, 
  AlertTriangle,
  Clock,
  Users,
  Eye,
  Settings,
  Plus,
  Trash2,
  Edit,
  PhoneCall,
  MessageSquare,
  Navigation,
  CheckCircle,
  Star,
  Flag,
  Heart,
  Lock
} from 'lucide-react';

const Safety = () => {
  const [sosEnabled, setSosEnabled] = useState(true);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Mom', phone: '+91 98765 43210', relationship: 'Family' },
    { id: 2, name: 'Rahul (Brother)', phone: '+91 87654 32109', relationship: 'Family' }
  ]);

  const trustedContacts = [
    { id: 1, name: 'Priya Sharma', avatar: '/api/placeholder/40/40', trips: 3, status: 'active' },
    { id: 2, name: 'Amit Kumar', avatar: '/api/placeholder/40/40', trips: 2, status: 'active' },
    { id: 3, name: 'Sneha Patel', avatar: '/api/placeholder/40/40', trips: 1, status: 'inactive' }
  ];

  const currentTrip = {
    destination: 'Hampi, Karnataka',
    companion: 'Amit Kumar',
    checkInTime: '09:00 AM',
    expectedReturn: '06:00 PM',
    status: 'active'
  };

  const safetyReports = [
    {
      id: 1,
      type: 'Inappropriate Behavior',
      reportedUser: 'Anonymous User',
      status: 'Under Review',
      date: '2024-03-10',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'Fake Profile',
      reportedUser: 'Reported User',
      status: 'Resolved',
      date: '2024-03-05',
      severity: 'high'
    }
  ];

  const localHelplines = [
    { region: 'Maharashtra', police: '100', tourism: '1363', women: '1091' },
    { region: 'Karnataka', police: '100', tourism: '1363', women: '1091' },
    { region: 'Goa', police: '100', tourism: '1363', women: '1091' },
    { region: 'Rajasthan', police: '100', tourism: '1363', women: '1091' }
  ];

  const SOSPanel = () => (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          Emergency SOS
        </CardTitle>
        <CardDescription className="text-red-700">
          Quick access to emergency services and trusted contacts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sos-enabled" className="font-medium">Enable SOS</Label>
            <p className="text-sm text-gray-600">One-tap emergency alert system</p>
          </div>
          <Switch 
            id="sos-enabled" 
            checked={sosEnabled} 
            onCheckedChange={setSosEnabled}
          />
        </div>

        {sosEnabled && (
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  EMERGENCY SOS
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-red-800">Emergency SOS Activated</DialogTitle>
                  <DialogDescription>
                    Your emergency contacts and local authorities will be notified
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      Are you in immediate danger? This will send your location and alert emergency services.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Cancel</Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">Confirm SOS</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-blue-600 border-blue-200">
                <Phone className="h-4 w-4 mr-2" />
                Call Police
              </Button>
              <Button variant="outline" className="text-green-600 border-green-200">
                <MessageSquare className="h-4 w-4 mr-2" />
                Alert Contacts
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const LocationSharingPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Location Sharing
        </CardTitle>
        <CardDescription>
          Share your real-time location with trusted contacts during trips
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="location-sharing" className="font-medium">Enable Location Sharing</Label>
            <p className="text-sm text-gray-600">Share location during active trips only</p>
          </div>
          <Switch 
            id="location-sharing" 
            checked={locationSharingEnabled} 
            onCheckedChange={setLocationSharingEnabled}
          />
        </div>

        {locationSharingEnabled && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Current Trip Tracking</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Destination:</span>
                  <span className="text-blue-900">{currentTrip.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Companion:</span>
                  <span className="text-blue-900">{currentTrip.companion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Check-in:</span>
                  <span className="text-blue-900">{currentTrip.checkInTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Expected Return:</span>
                  <span className="text-blue-900">{currentTrip.expectedReturn}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Navigation className="h-4 w-4 mr-2" />
                Share Current Location
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Location Sharing Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-share when trip starts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Share with emergency contacts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Share with travel companion</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const EmergencyContactsPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                  Add a trusted person who will be notified in case of emergency
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Contact name" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input placeholder="Family, Friend, etc." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Contact</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>
          People who will be notified during emergencies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {emergencyContacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
                <Badge variant="outline" className="text-xs mt-1">{contact.relationship}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const TrustedContactsPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Trusted Travel Companions
        </CardTitle>
        <CardDescription>
          People you've traveled with and trust
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trustedContacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.trips} trips together</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                  {contact.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const HelplinePanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5" />
          Local Helplines
        </CardTitle>
        <CardDescription>
          Important emergency numbers for different regions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localHelplines.map((helpline, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">{helpline.region}</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-medium text-red-600">Police</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    <Phone className="h-3 w-3 mr-1" />
                    {helpline.police}
                  </Button>
                </div>
                <div className="text-center">
                  <p className="font-medium text-blue-600">Tourism</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    <Phone className="h-3 w-3 mr-1" />
                    {helpline.tourism}
                  </Button>
                </div>
                <div className="text-center">
                  <p className="font-medium text-purple-600">Women Safety</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    <Phone className="h-3 w-3 mr-1" />
                    {helpline.women}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ReportsPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Safety Reports
        </CardTitle>
        <CardDescription>
          Your reports and community safety updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button className="w-full" variant="outline">
            <Flag className="h-4 w-4 mr-2" />
            Report Safety Issue
          </Button>
          
          <div className="space-y-3">
            <h4 className="font-medium">Recent Reports</h4>
            {safetyReports.map(report => (
              <div key={report.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm">{report.type}</h5>
                  <Badge variant={report.severity === 'high' ? 'destructive' : 'secondary'}>
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Reported on {report.date}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Center</h1>
          <p className="text-gray-600">
            Your comprehensive safety toolkit for secure travel experiences
          </p>
        </div>

        <Tabs defaultValue="emergency" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <SOSPanel />
              <HelplinePanel />
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <EmergencyContactsPanel />
              <TrustedContactsPanel />
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <LocationSharingPanel />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsPanel />
          </TabsContent>
        </Tabs>

        {/* Safety Guidelines */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Shield className="h-5 w-5" />
              Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Before Your Trip</h4>
                <ul className="space-y-1">
                  <li>• Verify your travel companion's profile</li>
                  <li>• Share your itinerary with emergency contacts</li>
                  <li>• Check local emergency numbers</li>
                  <li>• Enable location sharing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">During Your Trip</h4>
                <ul className="space-y-1">
                  <li>• Regular check-ins with contacts</li>
                  <li>• Meet in public places initially</li>
                  <li>• Trust your instincts</li>
                  <li>• Keep emergency numbers handy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Safety;
