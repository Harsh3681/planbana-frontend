import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { 
  MessageCircle, 
  Video, 
  Phone, 
  MoreVertical,
  Send,
  Search,
  Shield,
  Clock,
  CheckCircle,
  Heart,
  MapPin,
  Calendar,
  Users,
  AlertTriangle,
  Camera,
  Paperclip,
  Smile
} from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      participant: {
        name: 'Amit Kumar',
        avatar: '/api/placeholder/50/50',
        status: 'online',
        verificationLevel: 'verified'
      },
      tripDetails: {
        destination: 'Hampi, Karnataka',
        dates: 'March 15-17, 2024',
        status: 'confirmed'
      },
      lastMessage: {
        text: 'Great! Looking forward to exploring the temples together. Should we meet at the railway station?',
        timestamp: '2 minutes ago',
        isFromMe: false,
        isRead: false
      },
      unreadCount: 2,
      conversationType: 'individual'
    },
    {
      id: 2,
      participant: {
        name: 'Priya Sharma',
        avatar: '/api/placeholder/50/50',
        status: 'away',
        verificationLevel: 'verified'
      },
      tripDetails: {
        destination: 'Rishikesh, Uttarakhand',
        dates: 'March 20-24, 2024',
        status: 'pending'
      },
      lastMessage: {
        text: 'I\'ve shared my tentative itinerary. Please review and let me know your thoughts.',
        timestamp: '1 hour ago',
        isFromMe: true,
        isRead: true
      },
      unreadCount: 0,
      conversationType: 'individual'
    },
    {
      id: 3,
      participant: {
        name: 'Coorg Adventure Group',
        avatar: '/api/placeholder/50/50',
        status: 'group',
        verificationLevel: 'group'
      },
      tripDetails: {
        destination: 'Coorg, Karnataka',
        dates: 'March 22-25, 2024',
        status: 'planning'
      },
      lastMessage: {
        text: 'Rahul: Coffee plantation tour sounds amazing! Count me in 🌱',
        timestamp: '3 hours ago',
        isFromMe: false,
        isRead: true
      },
      unreadCount: 5,
      conversationType: 'group',
      memberCount: 4
    }
  ];

  const messages = [
    {
      id: 1,
      text: 'Hi Amit! I saw your interest in visiting Hampi. I\'m planning a trip there too!',
      timestamp: '2 days ago',
      isFromMe: true,
      isRead: true
    },
    {
      id: 2,
      text: 'Hello! That\'s wonderful! I\'ve been wanting to explore the Vijayanagara ruins for months.',
      timestamp: '2 days ago',
      isFromMe: false,
      isRead: true
    },
    {
      id: 3,
      text: 'Perfect! I\'m particularly interested in the photography opportunities there. Are you into photography too?',
      timestamp: '2 days ago',
      isFromMe: true,
      isRead: true
    },
    {
      id: 4,
      text: 'Absolutely! I love capturing heritage architecture. We should definitely coordinate our visit.',
      timestamp: '1 day ago',
      isFromMe: false,
      isRead: true
    },
    {
      id: 5,
      text: 'I\'ve checked the weather forecast - looks good for March 15-17. Does that work for you?',
      timestamp: '1 day ago',
      isFromMe: true,
      isRead: true
    },
    {
      id: 6,
      text: 'Those dates are perfect! I can arrange accommodation. There\'s a nice heritage hotel near the ruins.',
      timestamp: '12 hours ago',
      isFromMe: false,
      isRead: true
    },
    {
      id: 7,
      text: 'That sounds great! Please share the details. Also, should we plan our transport together?',
      timestamp: '10 hours ago',
      isFromMe: true,
      isRead: true
    },
    {
      id: 8,
      text: 'Great! Looking forward to exploring the temples together. Should we meet at the railway station?',
      timestamp: '2 minutes ago',
      isFromMe: false,
      isRead: false
    }
  ];

  const connectionRequests = [
    {
      id: 1,
      sender: {
        name: 'Sneha Patel',
        avatar: '/api/placeholder/50/50',
        city: 'Ahmedabad',
        verificationLevel: 'verified'
      },
      tripDetails: {
        destination: 'Rajasthan Circuit',
        dates: 'April 1-7, 2024'
      },
      message: 'Hi! I noticed we have similar interests in heritage sites and cultural exploration. Would you like to join our Rajasthan heritage tour?',
      timestamp: '2 hours ago',
      mutualInterests: 5
    },
    {
      id: 2,
      sender: {
        name: 'Rohan Mehta',
        avatar: '/api/placeholder/50/50',
        city: 'Delhi',
        verificationLevel: 'verified'
      },
      tripDetails: {
        destination: 'Ladakh',
        dates: 'June 10-20, 2024'
      },
      message: 'Looking for adventure enthusiasts for a Ladakh expedition. Your profile suggests you\'d be a great fit!',
      timestamp: '1 day ago',
      mutualInterests: 3
    }
  ];

  const ConversationItem = ({ conversation }: { conversation: typeof conversations[0] }) => (
    <div 
      onClick={() => setSelectedConversation(conversation.id)}
      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
        selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-adventure' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={conversation.participant.avatar} />
            <AvatarFallback>
              {conversation.participant.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {conversation.participant.status === 'online' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
          {conversation.conversationType === 'group' && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-adventure rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 truncate">
              {conversation.participant.name}
            </h3>
            <div className="flex items-center gap-2">
              {conversation.participant.verificationLevel === 'verified' && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className="text-xs text-gray-500">
                {conversation.lastMessage.timestamp}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">{conversation.tripDetails.destination}</span>
            <Badge 
              variant={conversation.tripDetails.status === 'confirmed' ? 'default' : 'secondary'} 
              className="text-xs"
            >
              {conversation.tripDetails.status}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 truncate">
            {conversation.lastMessage.text}
          </p>
        </div>
        
        {conversation.unreadCount > 0 && (
          <Badge className="bg-adventure text-white min-w-[20px] h-5 text-xs rounded-full flex items-center justify-center">
            {conversation.unreadCount}
          </Badge>
        )}
      </div>
    </div>
  );

  const MessageBubble = ({ message }: { message: typeof messages[0] }) => (
    <div className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${
        message.isFromMe 
          ? 'bg-adventure text-white' 
          : 'bg-gray-100 text-gray-900'
      } rounded-lg px-4 py-2`}>
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 ${
          message.isFromMe ? 'text-white/70' : 'text-gray-500'
        }`}>
          <span className="text-xs">{message.timestamp}</span>
          {message.isFromMe && (
            <CheckCircle className={`h-3 w-3 ${message.isRead ? 'text-white' : 'text-white/50'}`} />
          )}
        </div>
      </div>
    </div>
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with your travel companions safely and securely</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[600px]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto">
                <Tabs defaultValue="active">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="requests">
                      Requests
                      {connectionRequests.length > 0 && (
                        <Badge className="ml-2 bg-red-500">{connectionRequests.length}</Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="mt-0">
                    <div className="space-y-0">
                      {conversations.map(conversation => (
                        <ConversationItem key={conversation.id} conversation={conversation} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="requests" className="mt-0">
                    <div className="p-4 space-y-4">
                      {connectionRequests.map(request => (
                        <div key={request.id} className="border rounded-lg p-3">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={request.sender.avatar} />
                              <AvatarFallback>
                                {request.sender.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{request.sender.name}</h4>
                              <p className="text-xs text-gray-600">{request.sender.city}</p>
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          
                          <div className="text-xs text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.tripDetails.destination}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {request.tripDetails.dates}
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-700 mb-3">{request.message}</p>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">Accept</Button>
                            <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedConv ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.participant.avatar} />
                        <AvatarFallback>
                          {selectedConv.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConv.participant.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {selectedConv.tripDetails.destination}
                          <Badge variant="outline" className="text-xs">
                            {selectedConv.tripDetails.dates}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Video Call</DialogTitle>
                            <DialogDescription>
                              Start a secure video call with {selectedConv.participant.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-gray-100 rounded-lg p-8 text-center">
                              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-sm text-gray-600">Video calling feature coming soon</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Voice Call</DialogTitle>
                            <DialogDescription>
                              Start a secure voice call with {selectedConv.participant.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-gray-100 rounded-lg p-8 text-center">
                              <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-sm text-gray-600">Voice calling feature coming soon</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {messages.map(message => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="pr-10"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            // Handle send message
                            setNewMessage('');
                          }
                        }}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => setNewMessage('')}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Shield className="h-3 w-3" />
                    <span>Messages are encrypted and monitored for safety</span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the sidebar to start chatting
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Safety Notice */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-yellow-800 mb-1">Safety Reminder</h4>
                <p className="text-yellow-700">
                  Never share personal contact details, financial information, or meet in private locations. 
                  Always use our in-app communication until you're comfortable sharing contact details. 
                  Report any suspicious behavior immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Messages;
