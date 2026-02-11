import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserDropdown from '@/components/UserDropdown';
import NavItems from './NavItems';

const Header = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0 bg-background z-50 border-b">
      <div className=" flex items-center justify-between w-full h-16 px-4">
        {/* logo */}
        <div className="pl-4">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Fintracker logo"
            width={14}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        </div>

        <nav className="hidden sm:flex items-center pr-4 space-x-6">
         
        <NavItems/>
        </nav>

        <div className="flex items-center">
         <UserDropdown user={user} />
        </div>
      </div>
      
    </header>
  );
};

export default Header;
