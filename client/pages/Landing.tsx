import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Shield, 
  Heart,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  const [isLocationRequested, setIsLocationRequested] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Find Your Tribe',
      description: 'Connect with like-minded people for adventures, workouts, coffee dates and more.'
    },
    {
      icon: Shield,
      title: 'Safe & Verified',
      description: 'All users are verified with government ID. Safety is our top priority.'
    },
    {
      icon: MapPin,
      title: 'Local Events',
      description: 'Discover events happening right around your location.'
    },
    {
      icon: Calendar,
      title: 'Easy Planning',
      description: 'Create and join events with just a few taps. Planning made simple.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'Found my photography group through EventVibe! Amazing community.',
      avatar: '/api/placeholder/50/50',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      text: 'Best way to discover local events and meet new people safely.',
      avatar: '/api/placeholder/50/50',
      rating: 5
    },
    {
      name: 'Kavya Singh',
      text: 'Love the verification system. Makes me feel safe joining events.',
      avatar: '/api/placeholder/50/50',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🌟</div>
            <h1 className="text-xl font-bold">EventVibe</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button className="gradient-primary" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-electric h-96 md:h-[500px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text">
              Find Your Tribe,<br />Join the Vibe! ✨
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Discover local events, meet amazing people, and create unforgettable memories. 
              From road trips to coffee dates, your next adventure awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full bg-white text-adventure hover:bg-white/90 btn-bounce"
                onClick={onGetStarted}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Exploring
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/about">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EventVibe?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another events app. We're your gateway to authentic connections and amazing experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-100">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to start your adventure</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Sign Up & Verify', desc: 'Create account with government ID verification for safety' },
              { step: '2', title: 'Discover Events', desc: 'Browse local events or create your own adventure' },
              { step: '3', title: 'Connect & Explore', desc: 'Join events, meet people, and have amazing experiences' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
            <p className="text-lg text-gray-600">Real stories from our amazing community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">EventVibe User</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-electric">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure? 🚀
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of people already creating amazing memories on EventVibe
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full bg-white text-adventure hover:bg-white/90 btn-bounce"
            onClick={onGetStarted}
          >
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">🌟</div>
                <h3 className="text-xl font-bold">EventVibe</h3>
              </div>
              <p className="text-gray-400">
                Connecting people through amazing local experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/events" className="hover:text-white">Events</Link></li>
                <li><Link to="/create-event" className="hover:text-white">Create Event</Link></li>
                <li><Link to="/safety" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
