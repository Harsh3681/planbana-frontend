import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowLeft, AlertCircle, Cake } from 'lucide-react';

interface AgeStepProps {
  onNext: (data: { birthDate: string; age: number }) => void;
  onBack: () => void;
}

const AgeStep = ({ onNext, onBack }: AgeStepProps) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleContinue = () => {
    setError('');

    if (!day || !month || !year) {
      setError('Please enter your complete birth date');
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Validate date components
    if (dayNum < 1 || dayNum > 31) {
      setError('Please enter a valid day (1-31)');
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError('Please enter a valid month (1-12)');
      return;
    }

    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) {
      setError(`Please enter a valid year (1900-${currentYear})`);
      return;
    }

    // Create date and validate
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    
    if (birthDate.getDate() !== dayNum || birthDate.getMonth() !== monthNum - 1 || birthDate.getFullYear() !== yearNum) {
      setError('Please enter a valid date');
      return;
    }

    // Check if date is not in the future
    if (birthDate > new Date()) {
      setError('Birth date cannot be in the future');
      return;
    }

    // Calculate age
    const age = calculateAge(birthDate);
    
    if (age < 13) {
      setError('You must be at least 13 years old to use EventVibe');
      return;
    }

    if (age > 120) {
      setError('Please enter a valid birth date');
      return;
    }

    const formattedDate = `${dayNum.toString().padStart(2, '0')}/${monthNum.toString().padStart(2, '0')}/${yearNum}`;
    onNext({ birthDate: formattedDate, age });
  };

  const getAge = () => {
    if (day && month && year) {
      try {
        const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (!isNaN(birthDate.getTime()) && birthDate <= new Date()) {
          return calculateAge(birthDate);
        }
      } catch (e) {
        // Invalid date
      }
    }
    return null;
  };

  const currentAge = getAge();

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
          
          <div className="text-4xl mb-4">🎂</div>
          <h1 className="text-2xl font-bold">When's your birthday?</h1>
          <p className="text-gray-600">Help us show age-appropriate events</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Cake className="h-5 w-5" />
              Birth Date
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Input */}
            <div className="space-y-4">
              <Label className="text-center block">Enter your birth date (DD/MM/YYYY)</Label>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Day */}
                <div className="space-y-1">
                  <Label htmlFor="day" className="text-xs text-gray-600">Day</Label>
                  <Input
                    id="day"
                    type="number"
                    placeholder="DD"
                    value={day}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 2);
                      setDay(value);
                      setError('');
                    }}
                    className="text-center text-lg"
                    min="1"
                    max="31"
                  />
                </div>

                {/* Month */}
                <div className="space-y-1">
                  <Label htmlFor="month" className="text-xs text-gray-600">Month</Label>
                  <Input
                    id="month"
                    type="number"
                    placeholder="MM"
                    value={month}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 2);
                      setMonth(value);
                      setError('');
                    }}
                    className="text-center text-lg"
                    min="1"
                    max="12"
                  />
                </div>

                {/* Year */}
                <div className="space-y-1">
                  <Label htmlFor="year" className="text-xs text-gray-600">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="YYYY"
                    value={year}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 4);
                      setYear(value);
                      setError('');
                    }}
                    className="text-center text-lg"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              {/* Month Names Helper */}
              <div className="grid grid-cols-3 gap-1 text-xs text-gray-500">
                <div></div>
                <div className="text-center">
                  {month && parseInt(month) >= 1 && parseInt(month) <= 12 && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {months[parseInt(month) - 1]}
                    </span>
                  )}
                </div>
                <div></div>
              </div>
            </div>

            {/* Age Display */}
            {currentAge !== null && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-green-800">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  You are <strong>{currentAge} years old</strong>
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Privacy Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Why we need your age</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Show age-appropriate events and activities</li>
                <li>• Ensure safety guidelines are followed</li>
                <li>• Connect you with similar age groups</li>
                <li>• Your exact birth date is kept private</li>
              </ul>
            </div>

            <Button 
              onClick={handleContinue}
              disabled={!day || !month || !year}
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

export default AgeStep;
