import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Users, User, Menu, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 btn-bounce">
            <div className="w-10 h-10 bg-gradient-to-r from-adventure to-sunset rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-adventure to-sunset bg-clip-text text-transparent">
              TravelBuddy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/events') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Events
            </Link>
            <Link
              to="/create-event"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/create-event') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Create Event
            </Link>
            <Link
              to="/messages"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/messages') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Messages
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/profile') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Profile
            </Link>
            <Link
              to="/safety"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/safety') ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Safety
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-gray-100 btn-bounce" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="rounded-full bg-gradient-to-r from-adventure to-sunset hover:shadow-lg btn-bounce" asChild>
                <Link to="/register">Sign Up ✨</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/events') ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/create-event"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/create-event') ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Create Event
              </Link>
              <Link
                to="/profile"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/profile') ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/messages"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/messages') ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                to="/safety"
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/safety') ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Safety
              </Link>
              <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
