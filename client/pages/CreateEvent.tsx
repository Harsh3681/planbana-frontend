import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Tag,
  Camera,
  Plus,
  X,
  Car,
  Dumbbell,
  Coffee,
  Mountain,
  Utensils,
  Heart,
  Shield
} from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    startLocation: '',
    destination: '',
    sameAsStart: false, // when meeting point = destination
    date: undefined as Date | undefined,
    time: '',
    duration: '',
    maxParticipants: '',
    price: '',
    priceType: 'free', // free, paid, split
    tags: [] as string[],
    requirements: [] as string[],
    guidelines: ''
  });

  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const eventCategories = [
    { id: 'travel', name: 'Travel & Road Trips', icon: Car },
    { id: 'fitness', name: 'Gym & Fitness', icon: Dumbbell },
    { id: 'social', name: 'Hangout & Social', icon: Coffee },
    { id: 'adventure', name: 'Adventure & Outdoor', icon: Mountain },
    { id: 'food', name: 'Food & Dining', icon: Utensils },
    { id: 'photography', name: 'Photography', icon: Camera },
    { id: 'dating', name: 'Dating & Romance', icon: Heart }
  ];

  const suggestedTags = {
    travel: ['Road Trip', 'Weekend Getaway', 'Nature', 'Photography', 'Adventure', 'Sightseeing'],
    fitness: ['Gym', 'Running', 'Yoga', 'Strength Training', 'Cardio', 'Outdoor Workout'],
    social: ['Coffee', 'Networking', 'Co-working', 'Movies', 'Gaming', 'Books'],
    adventure: ['Trekking', 'Camping', 'Rock Climbing', 'Water Sports', 'Cycling', 'Hiking'],
    food: ['Food Tour', 'Cooking', 'Street Food', 'Fine Dining', 'Local Cuisine', 'Vegetarian'],
    photography: ['Street Photography', 'Nature Photography', 'Portrait', 'Workshop', 'Photo Walk'],
    dating: ['Casual Date', 'Coffee Date', 'Dinner Date', 'Activity Date', 'Group Date']
  };

  const handleAddTag = () => {
    if (newTag.trim() && !eventData.tags.includes(newTag.trim())) {
      setEventData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEventData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !eventData.requirements.includes(newRequirement.trim())) {
      setEventData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (reqToRemove: string) => {
    setEventData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== reqToRemove)
    }));
  };

  const handleSuggestedTagClick = (tag: string) => {
    if (!eventData.tags.includes(tag)) {
      setEventData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Event Data:', eventData);
    // Navigate to events page or show success message
    navigate('/events');
  };

  const selectedCategory = eventCategories.find(cat => cat.id === eventData.category);
  const categoryTags = eventData.category ? suggestedTags[eventData.category as keyof typeof suggestedTags] || [] : [];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create New Event
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize an amazing experience and connect with like-minded people in your area
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Tell people what your event is about
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={eventData.title}
                      onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Weekend Road Trip to Goa"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={eventData.category} 
                      onValueChange={(value) => setEventData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event category" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategories.map(category => {
                          const IconComponent = category.icon;
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                {category.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={eventData.description}
                      onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your event in detail. What will you do? What should people expect?"
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Date, Time & Location */}
              <Card>
                <CardHeader>
                  <CardTitle>When & Where</CardTitle>
                  <CardDescription>
                    Event timing and location details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {eventData.date ? format(eventData.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={eventData.date}
                            onSelect={(date) => setEventData(prev => ({ ...prev, date }))}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={eventData.time}
                        onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select 
                      value={eventData.duration} 
                      onValueChange={(value) => setEventData(prev => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="How long will it last?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                        <SelectItem value="2 hours">2 hours</SelectItem>
                        <SelectItem value="3 hours">3 hours</SelectItem>
                        <SelectItem value="Half day">Half day</SelectItem>
                        <SelectItem value="Full day">Full day</SelectItem>
                        <SelectItem value="2 days">2 days</SelectItem>
                        <SelectItem value="Weekend">Weekend</SelectItem>
                        <SelectItem value="3+ days">3+ days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="startLocation">Meeting Point (Start Location) *</Label>
                      <Input
                        id="startLocation"
                        value={eventData.startLocation}
                        onChange={(e) => setEventData(prev => ({ ...prev, startLocation: e.target.value }))}
                        placeholder="e.g., Bandra Railway Station, Mumbai"
                        required
                      />
                      <p className="text-xs text-gray-500">Where participants will meet initially</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsStart"
                        checked={eventData.sameAsStart}
                        onCheckedChange={(checked) => {
                          setEventData(prev => ({
                            ...prev,
                            sameAsStart: !!checked,
                            destination: checked ? prev.startLocation : ''
                          }));
                        }}
                      />
                      <Label htmlFor="sameAsStart" className="text-sm">
                        Activity happening at meeting point (no travel involved)
                      </Label>
                    </div>

                    {!eventData.sameAsStart && (
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination *</Label>
                        <Input
                          id="destination"
                          value={eventData.destination}
                          onChange={(e) => setEventData(prev => ({ ...prev, destination: e.target.value }))}
                          placeholder="e.g., Lonavala, Maharashtra"
                          required={!eventData.sameAsStart}
                        />
                        <p className="text-xs text-gray-500">Where you'll be going for the main activity</p>
                      </div>
                    )}

                    {eventData.sameAsStart && eventData.startLocation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700">
                          <strong>Event Location:</strong> {eventData.startLocation}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Participants & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Participants & Pricing</CardTitle>
                  <CardDescription>
                    How many people and what's the cost?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Maximum Participants *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      min="1"
                      max="50"
                      value={eventData.maxParticipants}
                      onChange={(e) => setEventData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                      placeholder="e.g., 6"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Pricing Type *</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="free" 
                          checked={eventData.priceType === 'free'}
                          onCheckedChange={() => setEventData(prev => ({ ...prev, priceType: 'free', price: '' }))}
                        />
                        <Label htmlFor="free">Free Event</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="paid" 
                          checked={eventData.priceType === 'paid'}
                          onCheckedChange={() => setEventData(prev => ({ ...prev, priceType: 'paid' }))}
                        />
                        <Label htmlFor="paid">Fixed Price per Person</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="split" 
                          checked={eventData.priceType === 'split'}
                          onCheckedChange={() => setEventData(prev => ({ ...prev, priceType: 'split' }))}
                        />
                        <Label htmlFor="split">Cost Split (Pay for your own)</Label>
                      </div>
                    </div>
                  </div>

                  {eventData.priceType === 'paid' && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Person (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        value={eventData.price}
                        onChange={(e) => setEventData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="e.g., 1500"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>
                    Help people discover your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Suggested Tags */}
                  {categoryTags.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Suggested Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {categoryTags.map(tag => (
                          <Button
                            key={tag}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestedTagClick(tag)}
                            disabled={eventData.tags.includes(tag)}
                            className="text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Custom Tag */}
                  <div className="space-y-2">
                    <Label>Add Custom Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" onClick={handleAddTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Selected Tags */}
                  {eventData.tags.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Selected Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {eventData.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => handleRemoveTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Requirements & Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Guidelines</CardTitle>
                  <CardDescription>
                    Set expectations for participants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Requirements</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="e.g., Own vehicle required"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
                      />
                      <Button type="button" onClick={handleAddRequirement} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {eventData.requirements.length > 0 && (
                    <div className="space-y-2">
                      {eventData.requirements.map(req => (
                        <div key={req} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{req}</span>
                          <X 
                            className="h-4 w-4 cursor-pointer text-gray-500" 
                            onClick={() => handleRemoveRequirement(req)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="guidelines">Additional Guidelines</Label>
                    <Textarea
                      id="guidelines"
                      value={eventData.guidelines}
                      onChange={(e) => setEventData(prev => ({ ...prev, guidelines: e.target.value }))}
                      placeholder="Any specific instructions, meeting points, what to bring, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Safety Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Safety & Community Guidelines</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Ensure your event promotes safe and inclusive experiences</li>
                    <li>• Meet in public places for first-time interactions</li>
                    <li>• Clearly communicate any risks or requirements</li>
                    <li>• Respect our community guidelines and local laws</li>
                    <li>• Be responsive to participants and maintain good communication</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/events')}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEvent;
