'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut } from 'lucide-react';
import NavItems from '@/components/ui/NavItems'
import { signOut } from '@/lib/actions/auth.actions';

const UserDropdwon = ({user}:{user:User}) => {
  const router: AppRouterInstance = useRouter();

  const handleSignOut: () => Promise<void> = async () => {
    await signOut();
    router.push("/signIn");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Avatar className="h-8 w-8">

            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-gray-400'>
        <DropdownMenuLabel>
          <div className='flex relative items-center gap-3 py-2'>
            <Avatar className="h-8 w-8">

              <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className='flex flex-col items-start'>

              <span className='text-base font-medium text-gray-400'>
                {user.name}
              </span>

              <span className='text-base font-medium text-gray-400'>
                {user.email}
              </span>

            </div>

           </div>
           </DropdownMenuLabel>
           <DropdownMenuSeparator className='bg-gray-600' />
        <DropdownMenuItem onClick={handleSignOut} className='text-gray-100 text-md font-medium focus focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer'>
          <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>


        <DropdownMenuSeparator className=' hidden sm:block bg-gray-600' />

        <nav className='sm:hidden'>
          <NavItems />

        </nav>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UserDropdwon