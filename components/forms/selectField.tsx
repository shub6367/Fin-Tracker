import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Control, Controller, FieldError, Path } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps<T = any> {
  name: Path<T>
  label: string
  placeholder: string
  options: SelectOption[]
  control: Control<T>
  errors?: FieldError
  required?: boolean
}

const SelectField = <T = any>({ 
  name, 
  label, 
  placeholder, 
  options, 
  control, 
  errors, 
  required = false 
}: SelectFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }: { field: any }) => (
          <Select onValueChange={field.onChange} value={String(field.value || '')} defaultValue={String(field.value)}>
            <SelectTrigger className="form-input">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors?.message && (
        <p className="text-red-500 text-sm mt-1">{String(errors.message)}</p>
      )}
    </div>
  )
}

export default SelectField