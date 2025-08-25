import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Camera, 
  Heart,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Globe,
  Mountain,
  Building,
  Waves,
  TreePine
} from 'lucide-react';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const destinations = [
    {
      id: 1,
      name: 'Ajanta Caves',
      city: 'Aurangabad',
      state: 'Maharashtra',
      category: 'Heritage',
      description: 'Ancient Buddhist rock-cut caves with stunning paintings and sculptures dating back to 2nd century BCE.',
      image: '/api/placeholder/400/250',
      rating: 4.8,
      reviewCount: 234,
      activeMembers: 45,
      upcomingTrips: 12,
      tags: ['Heritage Sites', 'Ancient Temples', 'Photography', 'Art & Culture'],
      bestTime: 'October to March',
      duration: '1-2 days',
      difficulty: 'Easy',
      estimatedCost: '₹3,000 - ₹8,000',
      highlights: ['UNESCO World Heritage Site', 'Ancient Buddhist Art', 'Rock-cut Architecture'],
      nearbyAttractions: ['Ellora Caves', 'Bibi Ka Maqbara', 'Daulatabad Fort']
    },
    {
      id: 2,
      name: 'Hampi',
      city: 'Hampi',
      state: 'Karnataka',
      category: 'Heritage',
      description: 'Ruins of the magnificent Vijayanagara Empire with temples, palaces, and boulder landscapes.',
      image: '/api/placeholder/400/250',
      rating: 4.9,
      reviewCount: 356,
      activeMembers: 78,
      upcomingTrips: 18,
      tags: ['Heritage Sites', 'Ancient Temples', 'Photography', 'Trekking'],
      bestTime: 'October to February',
      duration: '2-3 days',
      difficulty: 'Moderate',
      estimatedCost: '₹5,000 - ₹12,000',
      highlights: ['Vijayanagara Ruins', 'Virupaksha Temple', 'Boulder Landscape'],
      nearbyAttractions: ['Badami Caves', 'Pattadakal', 'Aihole']
    },
    {
      id: 3,
      name: 'Mahabalipuram',
      city: 'Mahabalipuram',
      state: 'Tamil Nadu',
      category: 'Heritage',
      description: 'Ancient port city with rock-cut temples, sculptures, and beautiful coastal scenery.',
      image: '/api/placeholder/400/250',
      rating: 4.7,
      reviewCount: 189,
      activeMembers: 32,
      upcomingTrips: 8,
      tags: ['Heritage Sites', 'Beach & Coastal', 'Ancient Temples', 'Photography'],
      bestTime: 'November to February',
      duration: '1-2 days',
      difficulty: 'Easy',
      estimatedCost: '₹4,000 - ₹10,000',
      highlights: ['Shore Temple', 'Pancha Rathas', 'Krishna\'s Butterball'],
      nearbyAttractions: ['Chennai', 'Kanchipuram', 'Pondicherry']
    },
    {
      id: 4,
      name: 'Rishikesh',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      category: 'Spiritual',
      description: 'Spiritual capital of India with ashrams, yoga centers, and adventure sports on the Ganges.',
      image: '/api/placeholder/400/250',
      rating: 4.6,
      reviewCount: 445,
      activeMembers: 89,
      upcomingTrips: 25,
      tags: ['Spiritual Journey', 'Adventure Sports', 'Nature & Wildlife', 'Mountain Escapades'],
      bestTime: 'September to November, March to April',
      duration: '3-5 days',
      difficulty: 'Easy to Moderate',
      estimatedCost: '₹3,000 - ₹15,000',
      highlights: ['Ganga Aarti', 'White Water Rafting', 'Lakshman Jhula'],
      nearbyAttractions: ['Haridwar', 'Mussoorie', 'Dehradun']
    },
    {
      id: 5,
      name: 'Coorg',
      city: 'Madikeri',
      state: 'Karnataka',
      category: 'Nature',
      description: 'Scotland of India with coffee plantations, misty hills, and beautiful waterfalls.',
      image: '/api/placeholder/400/250',
      rating: 4.5,
      reviewCount: 298,
      activeMembers: 56,
      upcomingTrips: 15,
      tags: ['Nature & Wildlife', 'Mountain Escapades', 'Photography', 'Food & Culture'],
      bestTime: 'September to March',
      duration: '2-4 days',
      difficulty: 'Easy',
      estimatedCost: '₹6,000 - ₹18,000',
      highlights: ['Coffee Plantations', 'Abbey Falls', 'Raja\'s Seat'],
      nearbyAttractions: ['Mysore', 'Ooty', 'Wayanad']
    },
    {
      id: 6,
      name: 'Goa Beaches',
      city: 'Panaji',
      state: 'Goa',
      category: 'Beach',
      description: 'Tropical paradise with pristine beaches, Portuguese heritage, and vibrant nightlife.',
      image: '/api/placeholder/400/250',
      rating: 4.4,
      reviewCount: 567,
      activeMembers: 123,
      upcomingTrips: 32,
      tags: ['Beach & Coastal', 'Food & Culture', 'Photography', 'Local Festivals'],
      bestTime: 'November to February',
      duration: '3-7 days',
      difficulty: 'Easy',
      estimatedCost: '₹8,000 - ₹25,000',
      highlights: ['Baga Beach', 'Old Goa Churches', 'Spice Plantations'],
      nearbyAttractions: ['Dudhsagar Falls', 'Anjuna Flea Market', 'Fort Aguada']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'Heritage', name: 'Heritage Sites', icon: Building },
    { id: 'Spiritual', name: 'Spiritual', icon: Heart },
    { id: 'Nature', name: 'Nature & Wildlife', icon: TreePine },
    { id: 'Beach', name: 'Beach & Coastal', icon: Waves },
    { id: 'Adventure', name: 'Adventure', icon: Mountain }
  ];

  const states = [
    'All States', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttarakhand', 'Goa', 
    'Rajasthan', 'Kerala', 'Himachal Pradesh', 'Punjab', 'West Bengal', 'Gujarat'
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    const matchesState = selectedState === 'all' || selectedState === 'All States' || destination.state === selectedState;
    
    return matchesSearch && matchesCategory && matchesState;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.activeMembers - a.activeMembers;
      case 'rating':
        return b.rating - a.rating;
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const DestinationCard = ({ destination }: { destination: typeof destinations[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-adventure/20 to-sunset/20 flex items-center justify-center">
          <Camera className="h-12 w-12 text-adventure" />
        </div>
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
          {destination.category}
        </Badge>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{destination.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{destination.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              {destination.city}, {destination.state}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{destination.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {destination.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {destination.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{destination.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {destination.activeMembers} active
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {destination.upcomingTrips} trips
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1" size="sm" asChild>
            <Link to={`/destinations/${destination.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/find-buddies">Find Buddies</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const TrendingDestinations = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Trending This Month</h2>
        <p className="text-gray-600">Most popular destinations among our community</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {destinations.slice(0, 3).map(destination => (
          <Card key={destination.id} className="relative overflow-hidden group">
            <div className="h-32 bg-gradient-to-r from-adventure/20 to-sunset/20 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-adventure" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{destination.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{destination.city}, {destination.state}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-600">{destination.activeMembers} active</span>
                </div>
                <Badge variant="secondary" className="text-xs">Trending</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Amazing Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover incredible places across India and find travel companions who share your passion for exploration
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Destinations</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <TrendingDestinations />
          </TabsContent>

          <TabsContent value="all">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-9"
                        placeholder="Search destinations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state === 'All States' ? 'all' : state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="alphabetical">A to Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {sortedDestinations.length} destinations
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDestinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>

            {sortedDestinations.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-adventure/10 to-sunset/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Dream Destination?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Suggest new destinations to our community or create a custom trip request. 
              Our travel experts will help you find the perfect companions for any adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Suggest Destination</Button>
              <Button size="lg" variant="outline">Create Custom Trip</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

function Label({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
}

export default Destinations;
