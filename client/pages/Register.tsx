import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneStep from './register/PhoneStep';
import PasswordStep from './register/PasswordStep';
import NameStep from './register/NameStep';
import ProfilePictureStep from './register/ProfilePictureStep';
import GenderStep from './register/GenderStep';
import AgeStep from './register/AgeStep';
import OccupationStep from './register/OccupationStep';
import LanguagesStep from './register/LanguagesStep';
import HobbiesStep from './register/HobbiesStep';
import LocationStep from './register/LocationStep';

interface RegistrationData {
  phone?: string;
  password?: string;
  name?: string;
  profilePicture?: File;
  gender?: string;
  birthDate?: string;
  age?: number;
  occupation?: string;
  company?: string;
  languages?: string[];
  hobbies?: string[];
  location?: {
    lat: number;
    lng: number;
    city: string;
  };
}

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});

  const handleStepComplete = (stepData: any) => {
    setRegistrationData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const handleStepBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleRegistrationComplete = async (finalData: any) => {
    const completeData = { ...registrationData, ...finalData };
    
    try {
      // Mock API call to complete registration
      console.log('Complete registration data:', completeData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page or events
      navigate('/events');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error - could show error page or go back to a step
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // For mobile, we show individual steps
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhoneStep 
            onNext={handleStepComplete}
            onBack={handleGoHome}
          />
        );
      case 2:
        return (
          <PasswordStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 3:
        return (
          <NameStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 4:
        return (
          <ProfilePictureStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
            userData={{ name: registrationData.name || '' }}
          />
        );
      case 5:
        return (
          <GenderStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 6:
        return (
          <AgeStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 7:
        return (
          <OccupationStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 8:
        return (
          <LanguagesStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 9:
        return (
          <HobbiesStep 
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        );
      case 10:
        return (
          <LocationStep 
            onComplete={handleRegistrationComplete}
            onBack={handleStepBack}
          />
        );
      default:
        return (
          <PhoneStep 
            onNext={handleStepComplete}
            onBack={handleGoHome}
          />
        );
    }
  };

  return renderCurrentStep();
};

export default Register;
