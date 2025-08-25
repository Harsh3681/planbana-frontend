import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernEventCard from '@/components/ModernEventCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
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
  Plus,
  Car,
  Dumbbell,
  Coffee,
  Camera,
  Mountain,
  Utensils,
  CalendarDays
} from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const eventCategories = [
    { id: 'all', name: 'All Events', icon: Users },
    { id: 'travel', name: 'Travel & Road Trips', icon: Car },
    { id: 'fitness', name: 'Gym & Fitness', icon: Dumbbell },
    { id: 'social', name: 'Hangout & Social', icon: Coffee },
    { id: 'adventure', name: 'Adventure & Outdoor', icon: Mountain },
    { id: 'food', name: 'Food & Dining', icon: Utensils },
    { id: 'photography', name: 'Photography', icon: Camera }
  ];

  const events = [
    {
      id: 1,
      title: 'Weekend Road Trip to Lonavala',
      category: 'travel',
      description: 'Join us for an amazing weekend getaway to Lonavala! We\'ll explore scenic viewpoints, caves, and enjoy local food.',
      location: 'Mumbai → Lonavala',
      date: '2024-03-16',
      time: '06:00 AM',
      duration: '2 days',
      maxParticipants: 6,
      currentParticipants: 3,
      price: '₹2,500',
      image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=400&h=300&fit=crop',
      organizer: {
        name: 'Rahul Sharma',
        avatar: '/api/placeholder/50/50',
        rating: 4.8,
        verified: true
      },
      tags: ['Road Trip', 'Nature', 'Photography', 'Adventure'],
      joinedUsers: [
        { name: 'Priya', avatar: '/api/placeholder/30/30' },
        { name: 'Amit', avatar: '/api/placeholder/30/30' },
        { name: 'Sneha', avatar: '/api/placeholder/30/30' }
      ]
    },
    {
      id: 2,
      title: 'Morning Gym Workout Buddy',
      category: 'fitness',
      description: 'Looking for a gym partner for early morning workouts. Focus on strength training and cardio. All fitness levels welcome!',
      location: 'Andheri West, Mumbai',
      date: '2024-03-15',
      time: '06:30 AM',
      duration: '1.5 hours',
      maxParticipants: 2,
      currentParticipants: 1,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      organizer: {
        name: 'Arjun Patel',
        avatar: '/api/placeholder/50/50',
        rating: 4.9,
        verified: true
      },
      tags: ['Gym', 'Fitness', 'Morning', 'Strength Training'],
      joinedUsers: []
    },
    {
      id: 3,
      title: 'Coffee & Co-working Session',
      category: 'social',
      description: 'Casual meetup for professionals and freelancers. Great opportunity to network while getting work done in a cafe setting.',
      location: 'Bandra, Mumbai',
      date: '2024-03-14',
      time: '10:00 AM',
      duration: '3 hours',
      maxParticipants: 8,
      currentParticipants: 5,
      price: 'Pay for your own',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop',
      organizer: {
        name: 'Kavya Singh',
        avatar: '/api/placeholder/50/50',
        rating: 4.7,
        verified: true
      },
      tags: ['Coffee', 'Networking', 'Co-working', 'Professional'],
      joinedUsers: [
        { name: 'Dev', avatar: '/api/placeholder/30/30' },
        { name: 'Maya', avatar: '/api/placeholder/30/30' },
        { name: 'Ravi', avatar: '/api/placeholder/30/30' },
        { name: 'Isha', avatar: '/api/placeholder/30/30' },
        { name: 'Karan', avatar: '/api/placeholder/30/30' }
      ]
    },
    {
      id: 4,
      title: 'Street Photography Walk',
      category: 'photography',
      description: 'Explore Mumbai\'s vibrant streets through photography. Perfect for beginners and experienced photographers alike.',
      location: 'Colaba, Mumbai',
      date: '2024-03-17',
      time: '04:00 PM',
      duration: '3 hours',
      maxParticipants: 10,
      currentParticipants: 7,
      price: '₹500',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      organizer: {
        name: 'Aditya Kumar',
        avatar: '/api/placeholder/50/50',
        rating: 4.9,
        verified: true
      },
      tags: ['Photography', 'Street Art', 'Walking', 'Learning'],
      joinedUsers: [
        { name: 'Pooja', avatar: '/api/placeholder/30/30' },
        { name: 'Rohit', avatar: '/api/placeholder/30/30' },
        { name: 'Neha', avatar: '/api/placeholder/30/30' }
      ]
    },
    {
      id: 5,
      title: 'Food Trail in Mohammed Ali Road',
      category: 'food',
      description: 'Discover the authentic flavors of Mumbai! Join us for a guided food tour through the famous Mohammed Ali Road.',
      location: 'Mohammed Ali Road, Mumbai',
      date: '2024-03-18',
      time: '07:00 PM',
      duration: '2.5 hours',
      maxParticipants: 12,
      currentParticipants: 8,
      price: '₹800',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      organizer: {
        name: 'Zara Sheikh',
        avatar: '/api/placeholder/50/50',
        rating: 4.8,
        verified: true
      },
      tags: ['Food', 'Culture', 'Local Experience', 'Walking'],
      joinedUsers: [
        { name: 'Sanjay', avatar: '/api/placeholder/30/30' },
        { name: 'Meera', avatar: '/api/placeholder/30/30' }
      ]
    },
    {
      id: 6,
      title: 'Trekking to Rajmachi Fort',
      category: 'adventure',
      description: 'Adventure lovers unite! Join us for a thrilling trek to the historic Rajmachi Fort with stunning monsoon views.',
      location: 'Lonavala → Rajmachi',
      date: '2024-03-19',
      time: '05:00 AM',
      duration: '1 day',
      maxParticipants: 15,
      currentParticipants: 12,
      price: '₹1,200',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      organizer: {
        name: 'Vikram Joshi',
        avatar: '/api/placeholder/50/50',
        rating: 4.9,
        verified: true
      },
      tags: ['Trekking', 'Adventure', 'Nature', 'History'],
      joinedUsers: [
        { name: 'Anita', avatar: '/api/placeholder/30/30' },
        { name: 'Raj', avatar: '/api/placeholder/30/30' },
        { name: 'Preethi', avatar: '/api/placeholder/30/30' },
        { name: 'Suresh', avatar: '/api/placeholder/30/30' }
      ]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = !selectedDate ||
      new Date(event.date).toDateString() === selectedDate.toDateString();

    return matchesCategory && matchesSearch && matchesDate;
  });

  const EventCard = ({ event }: { event: typeof events[0] }) => {
    const categoryInfo = eventCategories.find(cat => cat.id === event.category);
    const IconComponent = categoryInfo?.icon || Users;
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-adventure/10 rounded-lg flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-adventure" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {categoryInfo?.name}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.currentParticipants}/{event.maxParticipants}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Organizer */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.organizer.avatar} />
                <AvatarFallback>{event.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{event.organizer.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{event.organizer.rating}</span>
                  {event.organizer.verified && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-adventure">{event.price}</p>
              <p className="text-xs text-gray-600">{event.duration}</p>
            </div>
          </div>

          {/* Joined Users */}
          {event.joinedUsers.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {event.joinedUsers.slice(0, 4).map((user, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-gray-600">
                {event.joinedUsers.length} already joined
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join {event.title}</DialogTitle>
                  <DialogDescription>
                    Connect with {event.organizer.name} and other participants
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Event Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                      <p><strong>Cost:</strong> {event.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button size="sm">Confirm Join</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      {/* Desktop Header with Gradient */}
      <div className="relative overflow-hidden hidden md:block">
        <div className="gradient-electric h-32 sm:h-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white mobile-padding">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 neon-text">
              What's happening? ✨
            </h1>
            <p className="text-sm sm:text-lg text-white/90">
              Join the vibe, find your tribe! 🔥
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mobile-padding -mt-8 relative z-10 hidden md:block">


        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <Card className="sticky top-4 glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Find Events
                </CardTitle>
                <CardDescription>
                  Discover events happening around you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search Events</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-9"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Your Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Filter */}
                <div className="space-y-2">
                  <Label>Filter by Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Any date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  {selectedDate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDate(undefined)}
                      className="w-full text-xs"
                    >
                      Clear date filter
                    </Button>
                  )}
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>Event Categories</Label>
                  <div className="space-y-2">
                    {eventCategories.map(category => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-adventure text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to="/create-event">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-3">
            {/* Modern Header */}
            <div className="flex items-center justify-between mb-6 mobile-padding lg:px-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {filteredEvents.length} events found 🎯
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedCategory === 'all' ? 'All vibes' : eventCategories.find(c => c.id === selectedCategory)?.name} • {selectedLocation}
                </p>
              </div>

              <Select defaultValue="date">
                <SelectTrigger className="w-32 sm:w-48 rounded-full border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">📅 Date</SelectItem>
                  <SelectItem value="popular">🔥 Popular</SelectItem>
                  <SelectItem value="price">💰 Price</SelectItem>
                  <SelectItem value="spots">👥 Spots</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Events Grid - TikTok-style scroll on mobile, grid on desktop */}

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map(event => (
                <ModernEventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 mobile-padding lg:px-0">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl">😢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600 mb-6">Be the first to start something amazing!</p>
                <Button asChild className="rounded-full bg-gradient-to-r from-adventure to-sunset hover:shadow-lg btn-bounce">
                  <Link to="/create-event">
                    ✨ Create Event
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Full-Screen Reels Experience */}
      <div className="md:hidden fixed inset-0 z-40 bg-black">
        <div className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide pb-20">
          {/* Duplicate events for endless scrolling effect */}
          {[...filteredEvents, ...filteredEvents, ...filteredEvents].map((event, index) => (
            <div key={`${event.id}-${Math.floor(index / filteredEvents.length)}`} className="h-screen snap-start flex items-center justify-center relative">
              <div className="w-full h-full flex items-center justify-center p-0 pb-20">
                <div className="w-full h-full max-w-none">
                  <ModernEventCard event={event} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
