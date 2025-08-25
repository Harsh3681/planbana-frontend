import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertCircle, Users } from 'lucide-react';

interface GenderStepProps {
  onNext: (data: { gender: string }) => void;
  onBack: () => void;
}

const GenderStep = ({ onNext, onBack }: GenderStepProps) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [error, setError] = useState('');

  const genderOptions = [
    { id: 'male', label: 'Male', emoji: '👨' },
    { id: 'female', label: 'Female', emoji: '👩' },
    { id: 'non-binary', label: 'Non-binary', emoji: '🧑' },
    { id: 'transgender', label: 'Transgender', emoji: '🏳️‍⚧️' },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', emoji: '🤐' },
    { id: 'other', label: 'Other', emoji: '👤' }
  ];

  const handleContinue = () => {
    setError('');

    if (!selectedGender) {
      setError('Please select your gender identity');
      return;
    }

    onNext({ gender: selectedGender });
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
          
          <div className="text-4xl mb-4">🌈</div>
          <h1 className="text-2xl font-bold">What's your gender?</h1>
          <p className="text-gray-600">Help us create a safe and inclusive space</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              Gender Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gender Options */}
            <div className="space-y-3">
              {genderOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedGender(option.id);
                    setError('');
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                    selectedGender === option.id 
                      ? 'border-adventure bg-adventure/10 text-adventure' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Privacy Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Privacy & Inclusion</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Your gender helps us create inclusive events</li>
                <li>• This information is kept private by default</li>
                <li>• You can change visibility settings anytime</li>
                <li>• We welcome and support all gender identities</li>
              </ul>
            </div>

            <Button 
              onClick={handleContinue}
              disabled={!selectedGender}
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

export default GenderStep;
