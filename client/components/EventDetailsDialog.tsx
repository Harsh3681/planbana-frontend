import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Share, 
  MessageCircle,
  Navigation,
  DollarSign,
  Shield,
  AlertCircle,
  CheckCircle,
  X,
  Route,
  Flag
} from 'lucide-react';

interface EventDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
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
  } | null;
}

const EventDetailsDialog = ({ isOpen, onClose, event }: EventDetailsDialogProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);

  if (!event) return null;

  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = availableSpots <= 2;
  const isFull = availableSpots === 0;

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

  const handleJoinEvent = () => {
    setShowJoinConfirmation(true);
  };

  const confirmJoinEvent = () => {
    // Handle join event logic here
    setShowJoinConfirmation(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showJoinConfirmation} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Event Image */}
          {event.image && (
            <div className="relative h-64 -mt-6 -mx-6 mb-6 overflow-hidden rounded-t-lg">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm border-0 font-medium">
                  {getCategoryEmoji(event.category)} {event.category}
                </Badge>
              </div>

              {/* Hot Badge */}
              {isAlmostFull && !isFull && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white border-0 animate-pulse">
                    🔥 Almost Full
                  </Badge>
                </div>
              )}

              {/* Event Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
              </div>
            </div>
          )}

          <DialogHeader className={event.image ? '' : 'mb-6'}>
            {event.image ? (
              <VisuallyHidden>
                <DialogTitle>{event.title}</DialogTitle>
              </VisuallyHidden>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gray-100 text-gray-700">
                    {getCategoryEmoji(event.category)} {event.category}
                  </Badge>
                  {isAlmostFull && !isFull && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      🔥 Almost Full
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
              </>
            )}
          </DialogHeader>

          <div className="space-y-6">
            {/* Organizer Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback>{event.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{event.organizer.name}</p>
                    {event.organizer.verified && (
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{event.organizer.rating}</span>
                    <span className="text-sm text-gray-400">• Event Organizer</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-adventure" />
                    Date & Time
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-adventure" />
                    Participants
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current / Maximum</span>
                      <span className="font-medium">{event.currentParticipants} / {event.maxParticipants}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Available Spots</span>
                      <Badge variant={availableSpots > 0 ? "outline" : "destructive"} className="text-xs">
                        {availableSpots > 0 ? `${availableSpots} spots left` : 'Full'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-adventure" />
                    Pricing
                  </h3>
                  <div className="text-lg font-bold text-adventure">
                    {event.price}
                    {event.price !== 'Free' && event.price !== 'Pay for your own' && (
                      <span className="text-sm font-normal text-gray-600 ml-1">per person</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Route className="h-4 w-4 text-adventure" />
                    Location Details
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Flag className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Meeting Point</p>
                          <p className="text-sm font-medium">Mumbai Central Station</p>
                        </div>
                      </div>
                    </div>
                    
                    {event.location.includes('→') && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Navigation className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Destination</p>
                            <p className="text-sm font-medium">{event.location.split('→')[1].trim()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>Exact location shared after joining</span>
                    </div>
                  </div>
                </div>

                {/* Joined Users */}
                {event.joinedUsers.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Who's Joined</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {event.joinedUsers.slice(0, 4).map((user, index) => (
                          <Avatar key={index} className="h-8 w-8 border-2 border-white ring-1 ring-gray-200">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs bg-gradient-to-r from-adventure to-sunset text-white">
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {event.joinedUsers.length > 4 && (
                          <div className="h-8 w-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +{event.joinedUsers.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {event.joinedUsers.length === 1 
                          ? `${event.joinedUsers[0].name} joined` 
                          : `${event.joinedUsers.length} people joined`
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">About This Event</h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Tags */}
            {event.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag.toLowerCase().replace(/\s+/g, '')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-blue-800 mb-2">Safety First</h4>
                  <p className="text-blue-700">
                    All organizers are verified with government ID. Meet in public places and trust your instincts. 
                    Report any concerns to our support team.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onClose}
              >
                Maybe Later
              </Button>
              <Button 
                className={`flex-1 ${
                  availableSpots > 0 
                    ? 'bg-gradient-to-r from-adventure to-sunset hover:shadow-lg' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={availableSpots === 0}
                onClick={handleJoinEvent}
              >
                {availableSpots > 0 ? '🎉 Join Event' : 'Event Full'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Confirmation Dialog */}
      <Dialog open={showJoinConfirmation} onOpenChange={setShowJoinConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <DialogTitle>Join {event.title}?</DialogTitle>
            <DialogDescription>
              You're about to join this event. The organizer will be notified and you'll receive event details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Date</span>
                  <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Time</span>
                  <p className="font-medium">{event.time}</p>
                </div>
                <div>
                  <span className="text-gray-500">Meeting Point</span>
                  <p className="font-medium">Mumbai Central</p>
                </div>
                <div>
                  <span className="text-gray-500">Cost</span>
                  <p className="font-medium text-adventure">{event.price}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Please Note:</p>
                  <p>You'll receive exact location details and organizer contact info after joining.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowJoinConfirmation(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-adventure to-sunset"
                onClick={confirmJoinEvent}
              >
                Confirm & Join
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDetailsDialog;
