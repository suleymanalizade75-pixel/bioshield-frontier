import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <div className="font-orbitron text-8xl font-bold text-primary/20 mb-4">404</div>
        <div className="w-16 h-px bg-primary/30 mx-auto mb-6" />
        <h2 className="font-orbitron text-xl font-bold text-foreground mb-3">SIGNAL LOST</h2>
        <p className="font-inter text-muted-foreground mb-8 max-w-sm mx-auto">
          The page "{location.pathname.substring(1)}" could not be located in the system.
        </p>
        <Link to="/">
          <Button className="font-orbitron text-xs tracking-widest bg-primary text-primary-foreground px-8 py-5">
            <ShieldCheck className="w-4 h-4 mr-2" />
            RETURN TO BASE
          </Button>
        </Link>
      </div>
    </div>
  );
}