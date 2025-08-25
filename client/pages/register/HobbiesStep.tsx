import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, AlertCircle } from 'lucide-react';
import {
  Car, Dumbbell, Coffee, Camera, Mountain, Music, Gamepad2, 
  Book, Palette, Plane, Film, ShoppingBag, Briefcase, Users,
  Utensils, TreePine, Waves, Bike, Guitar, Brush, Code,
  Globe, Headphones, Scissors, Flower, Dog, Baby, Star
} from 'lucide-react';

interface HobbiesStepProps {
  onNext: (data: { hobbies: string[] }) => void;
  onBack: () => void;
}

const HobbiesStep = ({ onNext, onBack }: HobbiesStepProps) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [error, setError] = useState('');

  const hobbyCategories = [
    {
      name: 'Adventure & Outdoor',
      hobbies: [
        { id: 'travel', name: 'Travel', icon: Car },
        { id: 'trekking', name: 'Trekking', icon: Mountain },
        { id: 'camping', name: 'Camping', icon: TreePine },
        { id: 'cycling', name: 'Cycling', icon: Bike },
        { id: 'swimming', name: 'Swimming', icon: Waves },
        { id: 'adventure-sports', name: 'Adventure Sports', icon: Mountain }
      ]
    },
    {
      name: 'Fitness & Health',
      hobbies: [
        { id: 'gym', name: 'Gym & Fitness', icon: Dumbbell },
        { id: 'yoga', name: 'Yoga', icon: Star },
        { id: 'running', name: 'Running', icon: Dumbbell },
        { id: 'sports', name: 'Sports', icon: Dumbbell }
      ]
    },
    {
      name: 'Arts & Creativity',
      hobbies: [
        { id: 'photography', name: 'Photography', icon: Camera },
        { id: 'painting', name: 'Painting', icon: Brush },
        { id: 'art', name: 'Art & Crafts', icon: Palette },
        { id: 'music', name: 'Music', icon: Music },
        { id: 'guitar', name: 'Guitar', icon: Guitar },
        { id: 'dancing', name: 'Dancing', icon: Music }
      ]
    },
    {
      name: 'Technology & Learning',
      hobbies: [
        { id: 'coding', name: 'Programming', icon: Code },
        { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
        { id: 'reading', name: 'Reading', icon: Book },
        { id: 'learning', name: 'Learning New Skills', icon: Book }
      ]
    },
    {
      name: 'Social & Lifestyle',
      hobbies: [
        { id: 'social', name: 'Social Meetups', icon: Coffee },
        { id: 'food', name: 'Food & Cooking', icon: Utensils },
        { id: 'movies', name: 'Movies & TV', icon: Film },
        { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
        { id: 'networking', name: 'Networking', icon: Briefcase }
      ]
    },
    {
      name: 'Other Interests',
      hobbies: [
        { id: 'pets', name: 'Pets & Animals', icon: Dog },
        { id: 'gardening', name: 'Gardening', icon: Flower },
        { id: 'meditation', name: 'Meditation', icon: Star },
        { id: 'volunteering', name: 'Volunteering', icon: Heart },
        { id: 'fashion', name: 'Fashion & Style', icon: Scissors },
        { id: 'podcasts', name: 'Podcasts', icon: Headphones }
      ]
    }
  ];

  const handleHobbyToggle = (hobbyId: string) => {
    setSelectedHobbies(prev => {
      if (prev.includes(hobbyId)) {
        return prev.filter(id => id !== hobbyId);
      } else {
        return [...prev, hobbyId];
      }
    });
    setError('');
  };

  const handleContinue = () => {
    setError('');

    if (selectedHobbies.length < 3) {
      setError('Please select at least 3 hobbies to help us personalize your experience');
      return;
    }

    onNext({ hobbies: selectedHobbies });
  };

  const getHobbyName = (hobbyId: string) => {
    for (const category of hobbyCategories) {
      const hobby = category.hobbies.find(h => h.id === hobbyId);
      if (hobby) return hobby.name;
    }
    return hobbyId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adventure/5 to-sunset/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-4xl mb-4">🎯</div>
          <h1 className="text-2xl font-bold">What are your hobbies?</h1>
          <p className="text-gray-600">Select at least 3 to find like-minded people</p>
        </div>

        <Card className="border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              Select Your Interests
            </CardTitle>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Selected: {selectedHobbies.length} hobbies (minimum 3 required)
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected Hobbies */}
            {selectedHobbies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Selected Hobbies:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHobbies.map(hobbyId => (
                    <Badge 
                      key={hobbyId} 
                      variant="default"
                      className="bg-adventure text-white flex items-center gap-1"
                    >
                      {getHobbyName(hobbyId)}
                      <button
                        onClick={() => handleHobbyToggle(hobbyId)}
                        className="ml-1 hover:text-red-300"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Hobby Categories */}
            {hobbyCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">{category.name}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.hobbies.map(hobby => {
                    const IconComponent = hobby.icon;
                    const isSelected = selectedHobbies.includes(hobby.id);
                    return (
                      <button
                        key={hobby.id}
                        onClick={() => handleHobbyToggle(hobby.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left text-sm ${
                          isSelected 
                            ? 'border-adventure bg-adventure/10 text-adventure' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium">{hobby.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-2">How we use your hobbies</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Find events that match your interests</li>
                <li>• Connect with people who share your hobbies</li>
                <li>• Get personalized event recommendations</li>
                <li>• Join hobby-specific groups and communities</li>
              </ul>
            </div>

            <Button 
              onClick={handleContinue}
              className="w-full"
              size="lg"
              disabled={selectedHobbies.length < 3}
            >
              Continue ({selectedHobbies.length}/3 minimum)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HobbiesStep;
