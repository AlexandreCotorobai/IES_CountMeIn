// layouts/Navbar/index.tsx
import React from 'react';
import { ModeToggle } from '@/components/ModeToggle';
import logo from '@/assets/CountMeIn_logo.svg';
import { NavBarButton } from './components/NavBarButton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useTheme } from "@/components/ThemeProvider"



const NavBar: React.FC = () => {
  const isAuthenticated = false;
  const { theme } = useTheme()

  return (
    <nav className="navbar flex justify-between px-9 py-3 z-30 items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="CountMeIn" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className='p-3'>
            <ModeToggle />
        </div>
        {isAuthenticated ? (
          <>
            <Link to="/admindashboard">
              <NavBarButton label='Admin DashBoard'/>
            </Link>
            <Link to="/logout" className='pl-5'>
                  <Button className='rounded-full'>
                    <LogOut className={`h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all ${theme === 'dark' ? 'text-primary' : 'text-primary'}`} />
                    <span className="sr-only">Logout</span>
                  </Button>
            </Link>
          </>
        ) : (
            <>
             <Link to="/login">
                <NavBarButton label='Login'/>
              </Link> 
            </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
