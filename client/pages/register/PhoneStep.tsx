import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, ArrowLeft, Smartphone, AlertCircle, CheckCircle } from 'lucide-react';

interface PhoneStepProps {
  onNext: (data: { phone: string }) => void;
  onBack: () => void;
}

const PhoneStep = ({ onNext, onBack }: PhoneStepProps) => {
  const [phone, setPhone] = useState('');
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock API call to send OTP
      setTimeout(() => {
        setOtpSent(true);
        setShowOTPDialog(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock OTP verification
      setTimeout(() => {
        if (otp === '123456') {
          setIsLoading(false);
          setShowOTPDialog(false);
          onNext({ phone });
        } else {
          setError('Invalid OTP. Please try again.');
          setIsLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError('OTP verification failed');
      setIsLoading(false);
    }
  };

  return (
    <>
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
            
            <div className="text-4xl mb-4">📱</div>
            <h1 className="text-2xl font-bold">What's your number?</h1>
            <p className="text-gray-600">We'll send you a verification code</p>
          </div>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Phone Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    className="pl-10 text-lg"
                    maxLength={15}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || !phone}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </Button>

              <div className="text-center text-xs text-gray-500">
                By continuing, you agree to receive SMS messages from EventVibe
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <DialogTitle>Verify Your Phone</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit code to {phone}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                className="text-center text-2xl tracking-wider font-mono"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button 
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify Code
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-adventure hover:underline"
                onClick={handleSendOTP}
                disabled={isLoading}
              >
                Resend Code
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhoneStep;
