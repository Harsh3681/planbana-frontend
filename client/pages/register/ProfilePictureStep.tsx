import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, ArrowLeft, User, X } from 'lucide-react';

interface ProfilePictureStepProps {
  onNext: (data: { profilePicture?: File }) => void;
  onBack: () => void;
  userData: { name: string };
}

const ProfilePictureStep = ({ onNext, onBack, userData }: ProfilePictureStepProps) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfilePicture(null);
    setPreviewUrl(null);
  };

  const handleContinue = () => {
    onNext({ profilePicture: profilePicture || undefined });
  };

  const handleSkip = () => {
    onNext({ profilePicture: undefined });
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
          
          <div className="text-4xl mb-4">📸</div>
          <h1 className="text-2xl font-bold">Add a profile picture</h1>
          <p className="text-gray-600">Help others recognize you (optional)</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture Preview */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {previewUrl ? (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Profile preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-r from-adventure to-sunset rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="font-medium text-gray-900">{userData.name}</h3>
                <p className="text-sm text-gray-500">EventVibe User</p>
              </div>
            </div>

            {/* Upload Options */}
            <div className="space-y-3">
              {!previewUrl && (
                <>
                  {/* Camera Capture */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                      className="hidden"
                      id="camera-upload"
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('camera-upload')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take a Photo
                    </Button>
                  </div>

                  {/* File Upload */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose from Gallery
                    </Button>
                  </div>
                </>
              )}

              {previewUrl && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                    className="hidden"
                    id="change-photo"
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('change-photo')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Why add a photo?</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Helps others recognize you at events</li>
                <li>• Makes your profile more trustworthy</li>
                <li>• Increases connection opportunities</li>
                <li>• You can always change it later</li>
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
                disabled={!previewUrl}
              >
                {previewUrl ? 'Continue' : 'Skip'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePictureStep;
