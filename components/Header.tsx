import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navitems from '@/components/Navitems'
import UserDropdwon from './UserDropdown'



const Header = ({user}: {user: User} ) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="Fin Tracker Logo"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden sm:block">
            <Navitems />
          </nav>
          <UserDropdwon user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header