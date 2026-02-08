"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'


const Navitems = () => {
  const pathname: string = usePathname();

  const isActive: (path: string) => boolean = (path: string) => pathname === path
  return (
    <ul className="flex items-center space-x-6">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className={`hover:text-yellow-500 transition-colors ${isActive(href) ? 'text-yellow-500 font-semibold' : 'text-inherit'}`}>


            {label}
          </Link>
        </li>



      ))}
    </ul>
  )
}

export default Navitems