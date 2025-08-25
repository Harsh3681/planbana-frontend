import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Looks like you've wandered off the beaten path!</p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
