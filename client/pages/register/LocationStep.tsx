import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowLeft, AlertCircle, CheckCircle, Navigation, Shield } from 'lucide-react';

interface LocationStepProps {
  onComplete: (data: { location?: { lat: number; lng: number; city: string } }) => void;
  onBack: () => void;
}

const LocationStep = ({ onComplete, onBack }: LocationStepProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);

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
          const mockCities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata'];
          const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
          
          setIsLoading(false);
          setLocationGranted(true);
          
          // Wait a moment to show success state
          setTimeout(() => {
            onComplete({
              location: {
                lat: latitude,
                lng: longitude,
                city: randomCity
              }
            });
          }, 1500);
        },
        (error) => {
          setIsLoading(false);
          let errorMessage = 'Unable to get your location. ';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Location access was denied. You can still use the app, but we won\'t be able to show nearby events.';
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

  const handleSkipLocation = () => {
    onComplete({ location: undefined });
  };

  if (locationGranted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-adventure/5 to-sunset/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Location Access Granted! 📍</h2>
            
            <p className="text-gray-600 mb-6">
              Perfect! We can now show you events happening near you and help you discover amazing experiences in your area.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">What's next?</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Discover events near your location</li>
                <li>• Get distance-based recommendations</li>
                <li>• Find people in your area</li>
                <li>• Join local communities</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-adventure/5 to-sunset/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          
          <div className="text-4xl mb-4">📍</div>
          <h1 className="text-2xl font-bold">Enable location access</h1>
          <p className="text-gray-600">Find events and people near you</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Permission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Benefits */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Navigation className="h-4 w-4 text-adventure" />
                Why we need location access:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-adventure rounded-full mt-2 flex-shrink-0"></div>
                  <span>Find events happening near you</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-adventure rounded-full mt-2 flex-shrink-0"></div>
                  <span>Show accurate distances to event locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-adventure rounded-full mt-2 flex-shrink-0"></div>
                  <span>Connect with people in your area</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-adventure rounded-full mt-2 flex-shrink-0"></div>
                  <span>Get personalized local recommendations</span>
                </li>
              </ul>
            </div>

            {/* Privacy Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Your privacy matters
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Your exact location is never shared with other users</li>
                <li>• We only use it to show nearby events and distances</li>
                <li>• You can disable location access anytime in settings</li>
                <li>• Location data is processed securely and privately</li>
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
            <div className="space-y-3">
              <Button 
                onClick={handleAllowLocation}
                disabled={isLoading}
                className="w-full"
                size="lg"
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
                onClick={handleSkipLocation}
                disabled={isLoading}
                className="w-full"
              >
                Skip for Now
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              You can always enable location access later in your profile settings.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationStep;
