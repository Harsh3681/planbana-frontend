import Navigation from './Navigation';
import MobileBottomNav from './MobileBottomNav';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isEventsPage = location.pathname === '/events';

  return (
    <div className="min-h-screen bg-background">
      <div className={`${isEventsPage ? 'md:block hidden' : 'block'}`}>
        <Navigation />
      </div>
      <main className={`pb-20 md:pb-0`}>{children}</main>
      <div className="block">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default Layout;
