import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useState } from 'react';
import { format } from 'date-fns';
import { 
  MapPin, 
  Calendar as CalendarIcon,
  Users, 
  Star, 
  Heart,
  MessageCircle,
  Filter,
  Search,
  Clock,
  Shield,
  CheckCircle,
  UserPlus,
  Settings,
  Globe,
  Camera,
  Compass
} from 'lucide-react';

const FindBuddies = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [travelDates, setTravelDates] = useState<Date | undefined>(undefined);
  const [groupSize, setGroupSize] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState('');
  const [budget, setBudget] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [genderPreference, setGenderPreference] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const travelers = [
    {
      id: 1,
      name: 'Amit Kumar',
      age: 28,
      city: 'Mumbai',
      profilePhoto: '/api/placeholder/100/100',
      rating: 4.8,
      tripCount: 15,
      interests: ['Heritage Sites', 'Photography', 'Food & Culture'],
      languages: ['Hindi', 'English', 'Marathi'],
      verifiedBadges: ['Phone Verified', 'ID Verified', 'Experienced Traveler'],
      destination: 'Hampi',
      travelDates: 'March 15-17, 2024',
      groupSize: '2-3 people',
      bio: 'Heritage enthusiast who loves exploring ancient architecture and capturing moments. Always respect local culture and prefer early morning starts.',
      budget: '₹8,000 - ₹12,000',
      lastActive: '2 hours ago',
      compatibility: 95,
      mutualInterests: 4,
      responseRate: 98,
      joinedTrips: 12
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 25,
      city: 'Pune',
      profilePhoto: '/api/placeholder/100/100',
      rating: 4.9,
      tripCount: 22,
      interests: ['Ancient Temples', 'Spiritual Journey', 'Nature & Wildlife'],
      languages: ['Hindi', 'English', 'Gujarati'],
      verifiedBadges: ['Phone Verified', 'ID Verified', 'Highly Rated', 'Solo Friendly'],
      destination: 'Rishikesh',
      travelDates: 'March 20-24, 2024',
      groupSize: '3-4 people',
      bio: 'Spiritual seeker and nature lover. Looking for mindful travel experiences with like-minded souls. Vegetarian and early riser.',
      budget: '₹5,000 - ₹10,000',
      lastActive: '30 minutes ago',
      compatibility: 88,
      mutualInterests: 3,
      responseRate: 100,
      joinedTrips: 18
    },
    {
      id: 3,
      name: 'Rahul Desai',
      age: 32,
      city: 'Bangalore',
      profilePhoto: '/api/placeholder/100/100',
      rating: 4.6,
      tripCount: 8,
      interests: ['Photography', 'Adventure Sports', 'Local Festivals'],
      languages: ['Hindi', 'English', 'Kannada'],
      verifiedBadges: ['Phone Verified', 'ID Verified', 'Group Activities'],
      destination: 'Coorg',
      travelDates: 'March 22-25, 2024',
      groupSize: '4-5 people',
      bio: 'Adventure photographer seeking fellow explorers for unique experiences. Love discovering hidden gems and local stories.',
      budget: '₹10,000 - ₹15,000',
      lastActive: '1 day ago',
      compatibility: 82,
      mutualInterests: 2,
      responseRate: 85,
      joinedTrips: 6
    },
    {
      id: 4,
      name: 'Sneha Patel',
      age: 29,
      city: 'Ahmedabad',
      profilePhoto: '/api/placeholder/100/100',
      rating: 4.7,
      tripCount: 18,
      interests: ['Food & Culture', 'Heritage Sites', 'Art & Crafts'],
      languages: ['Hindi', 'English', 'Gujarati'],
      verifiedBadges: ['Phone Verified', 'ID Verified', 'Foodie', 'Cultural Explorer'],
      destination: 'Rajasthan Circuit',
      travelDates: 'April 1-7, 2024',
      groupSize: '3-5 people',
      bio: 'Cultural enthusiast and food explorer. Love learning about local traditions, crafts, and cuisine. Prefer immersive cultural experiences.',
      budget: '₹15,000 - ₹25,000',
      lastActive: '3 hours ago',
      compatibility: 91,
      mutualInterests: 5,
      responseRate: 92,
      joinedTrips: 14
    }
  ];

  const destinations = [
    'Hampi, Karnataka', 'Ajanta Caves, Maharashtra', 'Rishikesh, Uttarakhand',
    'Coorg, Karnataka', 'Goa Beaches', 'Mahabalipuram, Tamil Nadu',
    'Khajuraho, Madhya Pradesh', 'Konark, Odisha', 'Mysore, Karnataka'
  ];

  const interestOptions = [
    'Heritage Sites', 'Ancient Temples', 'Nature & Wildlife', 'Photography',
    'Food & Culture', 'Adventure Sports', 'Spiritual Journey', 'Architecture',
    'Local Festivals', 'Art & Crafts', 'Trekking', 'Beach & Coastal'
  ];

  const languageOptions = [
    'Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 
    'Bengali', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleLanguageToggle = (language: string) => {
    setLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const TravelerCard = ({ traveler }: { traveler: typeof travelers[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={traveler.profilePhoto} />
            <AvatarFallback>{traveler.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{traveler.name}</h3>
              <Badge className="bg-green-100 text-green-800">
                {traveler.compatibility}% Match
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {traveler.city}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {traveler.rating} ({traveler.tripCount} trips)
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {traveler.lastActive}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {traveler.verifiedBadges.slice(0, 3).map(badge => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  <CheckCircle className="h-2 w-2 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900 mb-1">Destination</p>
              <p className="text-gray-600">{traveler.destination}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Travel Dates</p>
              <p className="text-gray-600">{traveler.travelDates}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Group Size</p>
              <p className="text-gray-600">{traveler.groupSize}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">Budget</p>
              <p className="text-gray-600">{traveler.budget}</p>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Shared Interests ({traveler.mutualInterests})
          </p>
          <div className="flex flex-wrap gap-1">
            {traveler.interests.map(interest => (
              <Badge key={interest} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{traveler.bio}</p>

        {/* Stats */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span>Response Rate: {traveler.responseRate}%</span>
          <span>Joined {traveler.joinedTrips} trips</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send Connection Request</DialogTitle>
                <DialogDescription>
                  Introduce yourself to {traveler.name.split(' ')[0]} and express your interest in traveling together.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Hi! I'm interested in joining your trip to Hampi. I'm also passionate about heritage sites and photography..."
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Send Request</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{traveler.name}'s Full Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={traveler.profilePhoto} />
                    <AvatarFallback>{traveler.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{traveler.name}</h3>
                    <p className="text-gray-600">{traveler.age} years old, {traveler.city}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{traveler.rating}</span>
                      <span className="text-gray-600">({traveler.tripCount} trips)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-gray-600">{traveler.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <div className="flex gap-2">
                    {traveler.languages.map(lang => (
                      <Badge key={lang} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Verification Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {traveler.verifiedBadges.map(badge => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Travel Buddies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified travelers who share your interests and are planning similar adventures
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Find Perfect Matches
                </CardTitle>
                <CardDescription>
                  Customize your search to find the ideal travel companions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Destination */}
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Where do you want to go?" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map(dest => (
                        <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Travel Dates */}
                <div className="space-y-2">
                  <Label>Travel Dates</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {travelDates ? format(travelDates, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={travelDates}
                        onSelect={setTravelDates}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Group Size */}
                <div className="space-y-2">
                  <Label>Preferred Group Size</Label>
                  <Select value={groupSize} onValueChange={setGroupSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo (1-1 meetup)</SelectItem>
                      <SelectItem value="small">Small (2-3 people)</SelectItem>
                      <SelectItem value="medium">Medium (4-5 people)</SelectItem>
                      <SelectItem value="large">Large (6+ people)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Range */}
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <Select value={ageRange} onValueChange={setAgeRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 years</SelectItem>
                      <SelectItem value="26-35">26-35 years</SelectItem>
                      <SelectItem value="36-45">36-45 years</SelectItem>
                      <SelectItem value="46+">46+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget (₹2,000-₹8,000)</SelectItem>
                      <SelectItem value="mid">Mid-range (₹8,000-₹20,000)</SelectItem>
                      <SelectItem value="premium">Premium (₹20,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label>Travel Interests</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {interestOptions.map(interest => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={interests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                        />
                        <Label htmlFor={interest} className="text-sm cursor-pointer">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {languageOptions.map(language => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={languages.includes(language)}
                          onCheckedChange={() => handleLanguageToggle(language)}
                        />
                        <Label htmlFor={language} className="text-sm cursor-pointer">
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search Buddies
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {travelers.length} Travel Buddies Found
                </h2>
                <p className="text-sm text-gray-600">
                  Sorted by compatibility score and recent activity
                </p>
              </div>
              
              <Select defaultValue="compatibility">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compatibility">Best Match</SelectItem>
                  <SelectItem value="recent">Recently Active</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="trips">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6">
              {travelers.map(traveler => (
                <TravelerCard key={traveler.id} traveler={traveler} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Travelers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindBuddies;
