import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Shield } from 'lucide-react';

interface PasswordStepProps {
  onNext: (data: { password: string }) => void;
  onBack: () => void;
}

const PasswordStep = ({ onNext, onBack }: PasswordStepProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 6) return { strength: 'weak', color: 'bg-red-500', text: 'Weak' };
    if (pass.length < 8) return { strength: 'medium', color: 'bg-yellow-500', text: 'Medium' };
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return { strength: 'strong', color: 'bg-green-500', text: 'Strong' };
    }
    return { strength: 'medium', color: 'bg-yellow-500', text: 'Medium' };
  };

  const handleContinue = () => {
    setError('');

    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    onNext({ password });
  };

  const passwordStrength = getPasswordStrength(password);

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
          
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold">Create a password</h1>
          <p className="text-gray-600">Keep your account secure</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Secure Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Password strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength === 'strong' ? 'text-green-600' :
                      passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ 
                        width: passwordStrength.strength === 'strong' ? '100%' : 
                               passwordStrength.strength === 'medium' ? '66%' : '33%' 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Password must contain:</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  At least 8 characters
                </li>
                <li className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  One uppercase letter
                </li>
                <li className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  One number
                </li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button 
              onClick={handleContinue}
              disabled={!password || !confirmPassword}
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

export default PasswordStep;
