"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface DropdownContextType {
  activeDropdown: string | null
  setActiveDropdown: (id: string | null) => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  )
}
