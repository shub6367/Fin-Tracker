import React from 'react'
import { Label } from '../ui/label' 
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { UseFormRegister, RegisterOptions, FieldErrors, FieldError, Path } from 'react-hook-form'

interface InputFieldProps<T = any> {
  name: Path<T>
  label: string
  placeholder: string
  type?: string
  register: UseFormRegister<T>
  errors?: FieldErrors<T>
  disabled?: boolean
  validation?: RegisterOptions<T, Path<T>>
}

const InputField = <T = any>({ name, label, placeholder, type="text", register, errors, disabled=false, validation }: InputFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input 
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
        {...register(name, validation)}
      />
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  )
}

export default InputField