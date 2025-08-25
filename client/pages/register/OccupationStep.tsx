import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, ArrowLeft, AlertCircle } from 'lucide-react';

interface OccupationStepProps {
  onNext: (data: { occupation: string; company?: string }) => void;
  onBack: () => void;
}

const OccupationStep = ({ onNext, onBack }: OccupationStepProps) => {
  const [occupation, setOccupation] = useState('');
  const [customOccupation, setCustomOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const occupationOptions = [
    'Software Engineer/Developer',
    'Teacher/Educator',
    'Healthcare Professional',
    'Student',
    'Business Professional',
    'Creative/Artist',
    'Engineer',
    'Sales/Marketing',
    'Consultant',
    'Entrepreneur',
    'Finance Professional',
    'Government Employee',
    'Freelancer',
    'Retired',
    'Other'
  ];

  const handleContinue = () => {
    setError('');

    const finalOccupation = occupation === 'Other' ? customOccupation : occupation;

    if (!finalOccupation.trim()) {
      setError('Please select or enter your occupation');
      return;
    }

    onNext({ 
      occupation: finalOccupation.trim(),
      company: company.trim() || undefined
    });
  };

  const handleSkip = () => {
    onNext({ occupation: 'Prefer not to say' });
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
          
          <div className="text-4xl mb-4">💼</div>
          <h1 className="text-2xl font-bold">What do you do?</h1>
          <p className="text-gray-600">Help others know your professional background</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Briefcase className="h-5 w-5" />
              Occupation (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Occupation Selection */}
            <div className="space-y-2">
              <Label>What's your occupation?</Label>
              <Select value={occupation} onValueChange={(value) => {
                setOccupation(value);
                setError('');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your occupation" />
                </SelectTrigger>
                <SelectContent>
                  {occupationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Occupation Input */}
            {occupation === 'Other' && (
              <div className="space-y-2">
                <Label htmlFor="customOccupation">Specify your occupation</Label>
                <Input
                  id="customOccupation"
                  type="text"
                  placeholder="Enter your occupation"
                  value={customOccupation}
                  onChange={(e) => {
                    setCustomOccupation(e.target.value);
                    setError('');
                  }}
                  maxLength={50}
                />
              </div>
            )}

            {/* Company/Organization (Optional) */}
            {occupation && occupation !== 'Student' && occupation !== 'Retired' && (
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization (Optional)</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Where do you work?"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  maxLength={50}
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Why we ask */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Why we ask about your work</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Connect with people in similar fields</li>
                <li>• Find professional networking events</li>
                <li>• Join industry-specific meetups</li>
                <li>• This information helps personalize your experience</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button 
                onClick={handleContinue}
                className="flex-1"
                disabled={!occupation || (occupation === 'Other' && !customOccupation.trim())}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OccupationStep;
