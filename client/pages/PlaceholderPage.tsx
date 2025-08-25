import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Construction className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-8">{description}</p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;
