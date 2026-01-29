"use client"

import * as React from "react"
import { ChevronDown, Check, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useDropdown } from "@/contexts/DropdownContext"

interface SearchableSelectProps {
  options: { value: string; label: string }[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  SearchableSelectProps
>(({ options, value, onValueChange, placeholder = "Select an option...", className, disabled = false }, ref) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const dropdownId = React.useId()
  const { activeDropdown, setActiveDropdown } = useDropdown()

  const isOpen = activeDropdown === dropdownId

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options
    return options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [options, searchTerm])

  const selectedOption = options.find(option => option.value === value)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        // Check if click is outside the dropdown (including the fixed positioned one)
        const dropdownElement = document.querySelector(`[data-dropdown-id="${dropdownId}"]`)
        if (dropdownElement && !dropdownElement.contains(target)) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setActiveDropdown, dropdownId])

  const handleToggle = () => {
    if (disabled) return
    setActiveDropdown(isOpen ? null : dropdownId)
  }

  const handleSelect = (optionValue: string) => {
    if (disabled) return
    onValueChange(optionValue === value ? "" : optionValue)
    setActiveDropdown(null)
    setSearchTerm("")
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        disabled={disabled}
        className={cn(
          "w-full justify-between bg-neutral-900 border-gray-600 text-white hover:bg-neutral-800 focus:border-yellow-500",
          disabled && "opacity-50 cursor-not-allowed hover:bg-neutral-900",
          className
        )}
        ref={ref}
        onClick={handleToggle}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div 
          className="fixed z-[9999] max-h-80 overflow-hidden rounded-md border border-gray-600 bg-neutral-900 shadow-lg" 
          data-dropdown-id={dropdownId}
          style={{ 
            top: dropdownRef.current?.getBoundingClientRect().bottom + window.scrollY + 4 + 'px',
            left: dropdownRef.current?.getBoundingClientRect().left + window.scrollX + 'px',
            width: dropdownRef.current?.getBoundingClientRect().width + 'px'
          }}
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-600 p-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-gray-400" />
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-9 w-full rounded-md bg-transparent py-1 text-sm outline-none placeholder:text-gray-400 text-white border-0 focus:ring-0"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-400">
                No country found.
              </div>
            ) : (
              <div className="p-1">
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-neutral-700 focus:bg-neutral-700 text-white cursor-pointer",
                      value === option.value && "bg-neutral-700"
                    )}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      {value === option.value && (
                        <Check className="h-4 w-4 text-yellow-500" />
                      )}
                    </span>
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

SearchableSelect.displayName = "SearchableSelect"

export { SearchableSelect }
