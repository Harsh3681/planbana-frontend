import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Languages, Globe } from 'lucide-react';

interface LanguagesStepProps {
  onNext: (data: { languages: string[] }) => void;
  onBack: () => void;
}

const LanguagesStep = ({ onNext, onBack }: LanguagesStepProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
    { code: 'ms', name: 'Malay', flag: '🇲🇾' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' }
  ];

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(language)) {
        // Don't allow removing English if it's the only language
        if (language === 'English' && prev.length === 1) {
          return prev;
        }
        return prev.filter(lang => lang !== language);
      } else {
        return [...prev, language];
      }
    });
  };

  const handleContinue = () => {
    onNext({ languages: selectedLanguages });
  };

  // Group languages by region
  const indianLanguages = languageOptions.filter(lang => 
    ['English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'].includes(lang.name)
  );
  
  const internationalLanguages = languageOptions.filter(lang => 
    !['English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'].includes(lang.name)
  );

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
          
          <div className="text-4xl mb-4">🗣️</div>
          <h1 className="text-2xl font-bold">What languages do you speak?</h1>
          <p className="text-gray-600">Connect with people who speak your language</p>
        </div>

        <Card className="border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Languages className="h-5 w-5" />
              Select Languages
            </CardTitle>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Selected: {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected Languages */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Selected Languages:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLanguages.map(language => {
                  const langData = languageOptions.find(l => l.name === language);
                  return (
                    <Badge 
                      key={language} 
                      variant="default"
                      className="bg-adventure text-white flex items-center gap-1"
                    >
                      <span>{langData?.flag}</span>
                      {language}
                      {language !== 'English' && (
                        <button
                          onClick={() => handleLanguageToggle(language)}
                          className="ml-1 hover:text-red-300"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Indian Languages */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span>🇮🇳</span> Indian Languages
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {indianLanguages.map(language => {
                  const isSelected = selectedLanguages.includes(language.name);
                  return (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageToggle(language.name)}
                      className={`p-3 rounded-lg border-2 transition-all text-left text-sm ${
                        isSelected 
                          ? 'border-adventure bg-adventure/10 text-adventure' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* International Languages */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                International Languages
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {internationalLanguages.map(language => {
                  const isSelected = selectedLanguages.includes(language.name);
                  return (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageToggle(language.name)}
                      className={`p-3 rounded-lg border-2 transition-all text-left text-sm ${
                        isSelected 
                          ? 'border-adventure bg-adventure/10 text-adventure' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Why languages matter</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Find events conducted in your preferred language</li>
                <li>• Connect with people who speak your language</li>
                <li>• Join cultural and language exchange meetups</li>
                <li>• English is selected by default as it's widely used</li>
              </ul>
            </div>

            <Button 
              onClick={handleContinue}
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

export default LanguagesStep;
