import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EventDetailsDialog from './EventDetailsDialog';
import { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Zap,
  Flame,
  Star
} from 'lucide-react';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
    time: string;
    duration: string;
    maxParticipants: number;
    currentParticipants: number;
    price: string;
    image?: string;
    organizer: {
      name: string;
      avatar: string;
      rating: number;
      verified: boolean;
    };
    tags: string[];
    joinedUsers: Array<{ name: string; avatar: string; }>;
  };
}

const ModernEventCard = ({ event }: EventCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      travel: '🚗',
      fitness: '💪',
      social: '☕',
      photography: '📸',
      food: '🍽️',
      adventure: '🏔️',
      dating: '💕'
    };
    return emojiMap[category] || '🎉';
  };

  const getCategoryGradient = (category: string) => {
    const gradientMap: Record<string, string> = {
      travel: 'from-blue-400 to-purple-500',
      fitness: 'from-green-400 to-blue-500',
      social: 'from-yellow-400 to-orange-500',
      photography: 'from-purple-400 to-pink-500',
      food: 'from-red-400 to-yellow-500',
      adventure: 'from-green-500 to-teal-500',
      dating: 'from-pink-400 to-red-500'
    };
    return gradientMap[category] || 'from-gray-400 to-gray-600';
  };

  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = availableSpots <= 2;

  return (
    <div className="story-card animate-fade-scale group md:h-auto md:w-auto md:max-w-sm h-full w-full flex flex-col md:bg-white md:rounded-xl md:shadow-lg md:border md:border-gray-100 md:hover:shadow-xl md:transition-shadow md:mb-20 md:mb-0">
      {/* Header with organizer info */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="story-ring">
            <div className="story-inner">
              <Avatar className="h-10 w-10">
                <AvatarImage src={event.organizer.avatar} />
                <AvatarFallback>{event.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{event.organizer.name}</p>
              {event.organizer.verified && (
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-500">{event.organizer.rating}</span>
              <span className="text-xs text-gray-400">• {event.location}</span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="btn-bounce">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Event Image/Visual Area */}
      <div className={`relative md:h-48 md:mx-0 md:rounded-t-xl md:mb-0 flex-1 mx-4 rounded-2xl bg-gradient-to-br ${getCategoryGradient(event.category)} mb-3 overflow-hidden`}>
        {/* Desktop: Real image with gradient overlay */}
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="hidden md:block w-full h-full object-cover"
          />
        )}
        {/* Desktop gradient overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
        {/* Mobile gradient background */}
        <div className="md:hidden absolute inset-0 bg-black/20"></div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm border-0 font-medium">
            {getCategoryEmoji(event.category)} {event.category}
          </Badge>
        </div>
        
        {/* Trending/Hot badge */}
        {isAlmostFull && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500 text-white border-0 animate-pulse">
              <Flame className="h-3 w-3 mr-1" />
              Hot
            </Badge>
          </div>
        )}

        {/* Event title overlay - only on mobile */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-bold text-lg leading-tight">{event.title}</h3>
        </div>
      </div>

      {/* Event Details */}
      <div className="px-4 md:px-4 space-y-3">
        {/* Desktop title */}
        <div className="hidden md:block pt-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
          <Badge className="bg-gray-100 text-gray-700 text-xs">
            {getCategoryEmoji(event.category)} {event.category}
          </Badge>
        </div>
        {/* Quick info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="h-4 w-4" />
            <span>{event.currentParticipants}/{event.maxParticipants}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {showFullDescription 
              ? event.description 
              : `${event.description.slice(0, 100)}${event.description.length > 100 ? '...' : ''}`
            }
            {event.description.length > 100 && (
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-adventure font-medium ml-1"
              >
                {showFullDescription ? 'less' : 'more'}
              </button>
            )}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs rounded-full bg-gray-100 text-gray-600 border-0">
              #{tag.toLowerCase().replace(/\s+/g, '')}
            </Badge>
          ))}
        </div>

        {/* Joined users preview */}
        {event.joinedUsers.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {event.joinedUsers.slice(0, 3).map((user, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white ring-1 ring-gray-200">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs bg-gradient-to-r from-adventure to-sunset text-white">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {event.joinedUsers.length === 1 
                ? `${event.joinedUsers[0].name} joined` 
                : `${event.joinedUsers.length} people joined`
              }
            </span>
          </div>
        )}

        {/* Price and availability */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-adventure to-sunset bg-clip-text text-transparent">
              {event.price}
              {event.price !== 'Free' && event.price !== 'Pay for your own' && (
                <span className="text-xs font-normal text-gray-500 ml-1">per person</span>
              )}
            </span>
            <p className="text-xs text-gray-500">{event.duration}</p>
          </div>
          
          {availableSpots > 0 ? (
            <Badge variant="outline" className={`border-green-200 text-green-700 ${isAlmostFull ? 'animate-pulse' : ''}`}>
              {availableSpots} spots left
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-700 border-red-200">
              Full
            </Badge>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 p-4 pt-3">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center gap-1 p-2 rounded-full transition-all btn-bounce ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        
        <button className="flex items-center gap-1 p-2 rounded-full text-gray-500 hover:text-adventure transition-colors btn-bounce">
          <MessageCircle className="h-5 w-5" />
        </button>
        
        <button className="flex items-center gap-1 p-2 rounded-full text-gray-500 hover:text-adventure transition-colors btn-bounce">
          <Share className="h-5 w-5" />
        </button>

        <div className="flex-1"></div>

        <Button
          className={`rounded-full px-6 font-semibold btn-bounce ${
            availableSpots > 0
              ? 'bg-gradient-to-r from-adventure to-sunset hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={availableSpots === 0}
          onClick={() => setShowEventDetails(true)}
        >
          <Zap className="h-4 w-4 mr-1" />
          {availableSpots > 0 ? 'Join Now' : 'Full'}
        </Button>
      </div>

      <EventDetailsDialog
        isOpen={showEventDetails}
        onClose={() => setShowEventDetails(false)}
        event={event}
      />
    </div>
  );
};

export default ModernEventCard;
