import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { 
  Shield, 
  Star, 
  MapPin, 
  Camera, 
  Edit,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  Heart,
  Award,
  Settings
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in real app this would come from API
  const [userData, setUserData] = useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    bio: 'Passionate traveler and heritage enthusiast. Love exploring ancient temples and meeting new people. Always up for a spontaneous adventure!',
    profilePhoto: '/api/placeholder/150/150',
    interests: ['Heritage Sites', 'Photography', 'Food & Culture', 'Ancient Temples'],
    languages: ['Hindi', 'English', 'Marathi'],
    verificationStatus: {
      phone: true,
      email: true,
      governmentId: true,
      backgroundCheck: 'pending'
    },
    stats: {
      tripsCompleted: 12,
      rating: 4.8,
      reviewCount: 15,
      joinDate: '2024-01-15'
    },
    preferences: {
      groupSize: 'small',
      travelFrequency: 'monthly',
      budgetRange: '5000-15000',
      preferredDays: ['Saturday', 'Sunday']
    },
    recentTrips: [
      { destination: 'Ajanta Caves', date: '2024-03-15', companions: 3, rating: 5 },
      { destination: 'Hampi', date: '2024-02-20', companions: 2, rating: 4.5 },
      { destination: 'Konark Sun Temple', date: '2024-01-28', companions: 4, rating: 5 }
    ]
  });

  const calculateProfileCompletion = () => {
    let completed = 0;
    const total = 10;
    
    if (userData.profilePhoto) completed++;
    if (userData.bio) completed++;
    if (userData.interests.length > 0) completed++;
    if (userData.languages.length > 0) completed++;
    if (userData.verificationStatus.phone) completed++;
    if (userData.verificationStatus.email) completed++;
    if (userData.verificationStatus.governmentId) completed++;
    if (userData.preferences.groupSize) completed++;
    if (userData.preferences.budgetRange) completed++;
    if (userData.preferences.preferredDays.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const getVerificationBadges = () => {
    const badges = [];
    if (userData.verificationStatus.phone) badges.push('Phone Verified');
    if (userData.verificationStatus.email) badges.push('Email Verified');
    if (userData.verificationStatus.governmentId) badges.push('ID Verified');
    if (userData.stats.tripsCompleted > 10) badges.push('Experienced Traveler');
    if (userData.stats.rating > 4.5) badges.push('Highly Rated');
    return badges;
  };

  const ProfileOverview = () => (
    <div className="space-y-6">
      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Profile Completion
          </CardTitle>
          <CardDescription>
            Complete your profile to get better matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Progress</span>
              <span className="text-sm text-gray-600">{calculateProfileCompletion()}%</span>
            </div>
            <Progress value={calculateProfileCompletion()} className="h-2" />
            
            {calculateProfileCompletion() < 100 && (
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Complete these to boost your profile:</p>
                <ul className="space-y-1">
                  {!userData.profilePhoto && <li>• Add a profile photo</li>}
                  {!userData.bio && <li>• Write a bio</li>}
                  {userData.interests.length === 0 && <li>• Add travel interests</li>}
                  {userData.languages.length === 0 && <li>• Add languages you speak</li>}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trust Signals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-adventure" />
            Trust & Safety
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-adventure">{userData.stats.rating}/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(userData.stats.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-adventure">{userData.stats.tripsCompleted}</div>
              <div className="text-sm text-gray-600">Trips Completed</div>
              <div className="text-xs text-gray-500 mt-1">{userData.stats.reviewCount} reviews</div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Verification Badges:</p>
            <div className="flex flex-wrap gap-2">
              {getVerificationBadges().map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userData.recentTrips.map((trip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{trip.destination}</p>
                  <p className="text-sm text-gray-600">{trip.date} • {trip.companions} companions</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{trip.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProfileSettings = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Basic Information
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.profilePhoto} />
              <AvatarFallback>{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={userData.firstName}
                disabled={!isEditing}
                onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={userData.lastName}
                disabled={!isEditing}
                onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={userData.bio}
              disabled={!isEditing}
              onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Preferred Group Size</Label>
              <p className="text-sm text-gray-600 capitalize">{userData.preferences.groupSize} groups</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Travel Frequency</Label>
              <p className="text-sm text-gray-600 capitalize">{userData.preferences.travelFrequency}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Travel Interests</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {userData.interests.map((interest) => (
                <Badge key={interest} variant="outline">{interest}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safety & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Sharing</p>
                <p className="text-sm text-gray-600">Allow trusted contacts to see your location during trips</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Emergency Contacts</p>
                <p className="text-sm text-gray-600">People to notify in case of emergency</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-600">Control who can see your profile</p>
              </div>
              <Button variant="outline" size="sm">Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-adventure to-sunset rounded-lg p-6 text-white mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={userData.profilePhoto} />
              <AvatarFallback className="text-adventure text-lg">
                {userData.firstName[0]}{userData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {userData.firstName} {userData.lastName}
              </h1>
              <div className="flex items-center gap-4 text-white/90 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {userData.city}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Member since {new Date(userData.stats.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
              <p className="text-white/90">{userData.bio}</p>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProfileOverview />
          </TabsContent>

          <TabsContent value="settings">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews from Travel Companions</CardTitle>
                <CardDescription>
                  See what other travelers say about their experience with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Reviews and ratings will appear here after your first trip</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
