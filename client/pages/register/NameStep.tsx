import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ArrowLeft, AlertCircle } from 'lucide-react';

interface NameStepProps {
  onNext: (data: { name: string }) => void;
  onBack: () => void;
}

const NameStep = ({ onNext, onBack }: NameStepProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setError('Name can only contain letters and spaces');
      return;
    }

    onNext({ name: name.trim() });
  };

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
          
          <div className="text-4xl mb-4">👋</div>
          <h1 className="text-2xl font-bold">What's your name?</h1>
          <p className="text-gray-600">This is how others will see you</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <User className="h-5 w-5" />
              Tell us your name
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  className="pl-10 text-lg"
                  maxLength={50}
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500">
                This will be displayed on your profile
              </p>
            </div>

            {/* Name Preview */}
            {name && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">EventVibe User</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Privacy Note</h4>
              <p className="text-xs text-blue-800">
                Your name will be visible to other users when you join events or create activities. 
                You can change this later in your profile settings.
              </p>
            </div>

            <Button 
              onClick={handleContinue}
              disabled={!name.trim()}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NameStep;
