import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, AlertCircle, Navigation } from 'lucide-react';

interface LocationPermissionDialogProps {
  isOpen: boolean;
  onLocationGranted: (location: { lat: number; lng: number; city: string }) => void;
  onLocationDenied: () => void;
}

const LocationPermissionDialog = ({ 
  isOpen, 
  onLocationGranted, 
  onLocationDenied 
}: LocationPermissionDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAllowLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Mock reverse geocoding - in real app you'd use Google Maps API or similar
          const mockCities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'];
          const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
          
          setIsLoading(false);
          onLocationGranted({
            lat: latitude,
            lng: longitude,
            city: randomCity
          });
        },
        (error) => {
          setIsLoading(false);
          let errorMessage = 'Unable to get your location. ';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          
          setError(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } catch (err) {
      setIsLoading(false);
      setError('Unable to access location services');
    }
  };

  const handleDenyLocation = () => {
    onLocationDenied();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold">
            EventVibe wants to access your location
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            We'll use your location to show you events happening nearby and help you discover amazing experiences in your area.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Benefits */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Navigation className="h-4 w-4 text-adventure" />
              Why we need location:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Find events near you</li>
              <li>• Show accurate distances</li>
              <li>• Better event recommendations</li>
              <li>• Connect with local community</li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium">Location Access Failed</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleAllowLocation}
              disabled={isLoading}
              className="w-full gradient-primary"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Getting Location...
                </div>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Allow Location Access
                </>
              )}
            </Button>

            <Button 
              variant="outline" 
              onClick={handleDenyLocation}
              disabled={isLoading}
              className="w-full"
            >
              Not Now
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            You can always change this in your browser settings later.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPermissionDialog;
