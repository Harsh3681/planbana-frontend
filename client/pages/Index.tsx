import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Users,
  Shield,
  Heart,
  Compass,
  Star,
  ArrowRight,
  CheckCircle,
  Calendar
} from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-electric"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10 text-center mobile-padding max-w-4xl mx-auto">
          <div className="animate-fade-scale">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <span className="text-2xl">✨</span>
              <span className="text-white font-medium">Your next adventure awaits</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Never Do
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 neon-text">
                Anything Alone
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the coolest events or create your own! From road trips 🚗 to gym sessions 💪,
              coffee dates ☕ to adventure activities 🏔️
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-2xl btn-pulse text-lg px-8 py-4" asChild>
                <Link to="/events">
                  🔥 Explore Events
                </Link>
              </Button>
              <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-lg px-8 py-4 btn-bounce" variant="outline" asChild>
                <Link to="/create-event">✨ Create Event</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Planbana Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, safe, and secure way to join events or find activity partners in just 3 steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-adventure rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Secure Registration</h3>
              <p className="text-gray-600">
                Register with your government ID for verified, safe connections.
                We prioritize your security and privacy above everything else.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sunset rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Find or Create Events</h3>
              <p className="text-gray-600">
                Browse local events in your area or create your own - from road trips
                to gym sessions, social meetups to adventure activities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Join & Connect</h3>
              <p className="text-gray-600">
                Join events that interest you and connect with like-minded people.
                Chat safely, plan together, and enjoy amazing experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Planbana?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the safest and most reliable platform for finding activity partners and creating meaningful experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-adventure mb-2" />
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>
                  All users verified with government ID for maximum safety and trust
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <MapPin className="h-10 w-10 text-sunset mb-2" />
                <CardTitle>Diverse Events</CardTitle>
                <CardDescription>
                  From road trips to gym sessions, photography walks to food tours - endless possibilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-forest mb-2" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  Find people with similar interests and availability in your local area
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Heart className="h-10 w-10 text-adventure mb-2" />
                <CardTitle>Safe Connections</CardTitle>
                <CardDescription>
                  Privacy-first approach - contact details shared only when you're ready
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Star className="h-10 w-10 text-sunset mb-2" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Join a community of passionate travelers exploring India together
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-forest mb-2" />
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>
                  Simple, intuitive platform that gets you connected quickly and safely
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNGY0ZjQiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        <div className="max-w-7xl mx-auto mobile-padding relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-6 py-2 mb-6">
              <span className="text-xl">🔥</span>
              <span className="font-medium text-gray-800">What's Hot Right Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Trending Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the hottest events everyone's talking about!
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Weekend Road Trip to Lonavala',
                category: 'Travel',
                location: 'Mumbai → Lonavala',
                date: 'Mar 16',
                participants: '3/6',
                price: '₹2,500',
                organizer: 'Rahul S.',
                icon: '🚗'
              },
              {
                title: 'Morning Gym Workout Buddy',
                category: 'Fitness',
                location: 'Andheri West',
                date: 'Mar 15',
                participants: '1/2',
                price: 'Free',
                organizer: 'Arjun P.',
                icon: '💪'
              },
              {
                title: 'Coffee & Co-working Session',
                category: 'Social',
                location: 'Bandra',
                date: 'Mar 14',
                participants: '5/8',
                price: 'Pay for your own',
                organizer: 'Kavya S.',
                icon: '☕'
              },
              {
                title: 'Street Photography Walk',
                category: 'Photography',
                location: 'Colaba',
                date: 'Mar 17',
                participants: '7/10',
                price: '₹500',
                organizer: 'Aditya K.',
                icon: '📸'
              },
              {
                title: 'Food Trail Mohammed Ali Road',
                category: 'Food',
                location: 'Mohammed Ali Road',
                date: 'Mar 18',
                participants: '8/12',
                price: '₹800',
                organizer: 'Zara S.',
                icon: '🍽️'
              },
              {
                title: 'Trekking to Rajmachi Fort',
                category: 'Adventure',
                location: 'Lonavala',
                date: 'Mar 19',
                participants: '12/15',
                price: '₹1,200',
                organizer: 'Vikram J.',
                icon: '🏔���'
              }
            ].map((event, index) => (
              <div key={index} className="story-card card-hover mobile-card animate-fade-scale group">
                {/* Event Image Area */}
                <div className={`relative h-48 rounded-t-3xl overflow-hidden ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-green-400 to-blue-500' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                  'bg-gradient-to-br from-cyan-400 to-purple-500'
                }`}>
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm border-0 font-medium">
                      {event.icon} {event.category}
                    </Badge>
                  </div>

                  {/* Hot badge */}
                  {index < 2 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-500 text-white border-0 animate-pulse">
                        🔥 Hot
                      </Badge>
                    </div>
                  )}

                  {/* Event title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-bold leading-tight">{event.title}</h3>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold bg-gradient-to-r from-adventure to-sunset bg-clip-text text-transparent">
                        {event.price}
                      </p>
                      <p className="text-xs text-gray-500">by {event.organizer}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        {event.participants}
                      </div>
                      <Button size="sm" className="rounded-full bg-gradient-to-r from-adventure to-sunset hover:shadow-lg btn-bounce">
                        Join ✨
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/events">View All Events</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/create-event">Create Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-adventure to-sunset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of people who've found their perfect activity partners.
            Your next amazing experience is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-adventure hover:bg-gray-100" asChild>
              <Link to="/register">
                Join Planbana Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
