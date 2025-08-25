import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Chrome,
  Facebook,
  AlertCircle,
  CheckCircle,
  Smartphone
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [credentials, setCredentials] = useState({
    phone: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const identifier = loginMethod === 'phone' ? credentials.phone : credentials.email;
      
      if (!identifier || !credentials.password) {
        setError(`Please enter your ${loginMethod} and password`);
        setIsLoading(false);
        return;
      }

      // Mock API call - validate credentials
      setTimeout(() => {
        // For demo, simulate successful authentication that requires OTP
        setOtpSent(true);
        setShowOTPDialog(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock OTP verification
      if (otp === '123456') {
        setTimeout(() => {
          setIsLoading(false);
          setShowOTPDialog(false);
          // Navigate to events page after successful login
          navigate('/events');
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('OTP verification failed');
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    // Mock OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      navigate('/events');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adventure/5 to-sunset/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-4xl mb-4">🌟</div>
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your adventure</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="oauth" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="oauth">Quick Sign In</TabsTrigger>
                <TabsTrigger value="credentials">Another Way</TabsTrigger>
              </TabsList>

              {/* OAuth Login */}
              <TabsContent value="oauth" className="space-y-4">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading}
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOAuthLogin('facebook')}
                    disabled={isLoading}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Continue with Facebook
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  Quick and secure sign in with your existing accounts
                </div>
              </TabsContent>

              {/* Phone/Email + Password Login */}
              <TabsContent value="credentials" className="space-y-4">
                <form onSubmit={handleCredentialLogin} className="space-y-4">
                  {/* Login Method Toggle */}
                  <div className="flex rounded-lg border border-gray-200 p-1">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        loginMethod === 'phone' 
                          ? 'bg-adventure text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        loginMethod === 'email' 
                          ? 'bg-adventure text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Email
                    </button>
                  </div>

                  {/* Credential Input */}
                  <div className="space-y-2">
                    <Label htmlFor="credential">
                      {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                    </Label>
                    <div className="relative">
                      {loginMethod === 'phone' ? (
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      ) : (
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      )}
                      <Input
                        id="credential"
                        type={loginMethod === 'phone' ? 'tel' : 'email'}
                        placeholder={
                          loginMethod === 'phone' 
                            ? '+91 98765 43210' 
                            : 'your.email@example.com'
                        }
                        value={loginMethod === 'phone' ? credentials.phone : credentials.email}
                        onChange={(e) => setCredentials(prev => ({
                          ...prev,
                          [loginMethod]: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({
                          ...prev,
                          password: e.target.value
                        }))}
                        className="pl-10 pr-10"
                        required
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
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <Link to="/forgot-password" className="text-sm text-adventure hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-adventure font-medium hover:underline">
                Sign up now
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-adventure hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-adventure hover:underline">Privacy Policy</Link>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <DialogTitle>Verify Your Identity</DialogTitle>
            <DialogDescription>
              We've sent a verification code to {
                loginMethod === 'phone' ? credentials.phone : credentials.email
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOTPVerification} className="space-y-4">
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
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify & Sign In
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-adventure hover:underline"
                onClick={() => {
                  setOtpSent(true);
                  setError('');
                }}
                disabled={isLoading}
              >
                Resend Code
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
