import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Plus, 
  MessageCircle, 
  User,
  Heart
} from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/create-event', icon: Plus, label: 'Create', isSpecial: true },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Glass morphism background */}
      <div className="glass border-t border-white/20 px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            if (item.isSpecial) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg btn-bounce">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center py-2 px-3 min-w-[60px] btn-bounce"
              >
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'bg-gradient-to-r from-adventure to-sunset text-white shadow-lg' 
                    : 'text-gray-600 hover:text-adventure'
                }`}>
                  <Icon className="h-5 w-5" />
                  {active && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-neonPink rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium transition-colors ${
                  active ? 'text-adventure' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
