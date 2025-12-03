import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp, Menu, X, LogOut, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import routes from '@/routes';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigation = routes.filter((route) => route.visible !== false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="h-10 w-10 rounded bg-primary flex items-center justify-center netflix-glow">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight gradient-text">APEX INSIGHTS</span>
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            {user && profile ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-secondary">
                  {isAdmin ? (
                    <Shield className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium">{profile.username}</span>
                  {isAdmin && (
                    <span className="text-xs px-2 py-0.5 rounded bg-primary text-primary-foreground">
                      Admin
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  {user && profile && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded bg-secondary mb-2">
                      {isAdmin ? (
                        <Shield className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{profile.username}</p>
                        {isAdmin && (
                          <p className="text-xs text-muted-foreground">Administrator</p>
                        )}
                      </div>
                    </div>
                  )}

                  {navigation.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {user ? (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        setIsOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/login">Sign In</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
