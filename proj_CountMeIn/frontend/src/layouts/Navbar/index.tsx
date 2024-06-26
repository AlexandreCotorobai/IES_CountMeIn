// layouts/Navbar/index.tsx
import React from 'react';
import { ModeToggle } from '@/components/ModeToggle';
import logo from '@/assets/CountMeIn_logo.svg';
import { NavBarButton } from './components/NavBarButton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuthContext } from "@/contexts/auth"



const NavBar: React.FC = () => {
  const { isLogged, logout } = useAuthContext()

  return (
    <nav className="navbar flex justify-between px-9 py-3 z-30 items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="CountMeIn" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className='p-3 '>
            <ModeToggle />
        </div>
        {isLogged() ? (
          <>
            <Link to="/dashboard" className='pr-5'>
              <NavBarButton label='Admin DashBoard'/>
            </Link>
            <Button className='rounded-full dark:bg-sky-900 dark:hover:bg-sky-800 bg-cyan-600 hover:bg-cyan-700 pl-5' onClick={(event) => {
              event.preventDefault();
              logout();
            }}>
              <LogOut className={`h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all text-sky-100`} />
                  <span className="sr-only">Logout</span>
            </Button>
          </>
        ) : (
            <Link to="/login">
                <NavBarButton label='Login'/>
            </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
