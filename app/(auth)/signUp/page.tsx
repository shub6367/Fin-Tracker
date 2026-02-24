'use client'

import { Button } from '@/@/components/ui/button'

import React from 'react'

import { useForm } from 'react-hook-form'

import { SubmitHandler } from 'react-hook-form'

import InputField from '@/components/forms/inputField'

import SelectField from '@/components/forms/selectField'

import { INVESTMENT_GOALS } from '@/lib/constants'

import { RISK_TOLERANCE_OPTIONS } from '@/lib/constants'

import { PREFERRED_INDUSTRIES } from '@/lib/constants'

import { COUNTRIES } from '@/lib/constants'

import { DropdownProvider } from '@/contexts/DropdownContext'
import FooterLink from '@/components/forms/FooterLink'
 import {signUpWithEmail} from '@/lib/actions/auth.actions'
 import {useRouter} from 'next/navigation'
import { Description } from '@radix-ui/react-dialog'
import { jsonStringifyReplacer } from 'zod/v4/core/util.cjs'
import { toast } from 'sonner'
import { Sign } from 'crypto'


interface SignUpFormData {

  fullname: string;

  email: string;

  password: string;

  country: string;

  investmentGoals: string;

  riskTolerance: string;

  preferredIndustry: string;

}



const signUp = () => {

  const router = useRouter();

  const {

    register,

    handleSubmit,

    control,

    setValue,

    watch,

    formState: { errors, isSubmitting },

  } = useForm<SignUpFormData>({

    defaultValues: {

      fullname: '',

      email: '',

      password: '',

      country: '',

      investmentGoals: '',

      riskTolerance: '',

      preferredIndustry: '',

    },

    mode: 'onBlur',

  });



  const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
    console.log('onSubmit called with data:', data);
    try {
         console.log('Submitting sign-up data:', data);
         const result = await signUpWithEmail(data);
         console.log('Sign-up result:', result);
         
         if (result.success) {
           console.log('Redirecting to dashboard...');
           router.push('/');
         }
    
    } catch (error) {
      console.error('Sign-up error:', error);
      toast.error('Sign Up failed ',{
        description:error instanceof Error ? error.message :'failed to create account'
      })
    }

  };



  return (

    <DropdownProvider>

      <div className="signup-form">

        <h1 className="form-title">SignUp & Personalize</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <InputField

            name="fullname"

            label="Full Name"

            placeholder="Enter your full name"

            register={register}

            errors={errors.fullname}

            validation={{ required: 'Full name is required' }}

          />

          <InputField

            name="email"

            label="Email"

            placeholder="Enter your email"

            type="email"

            register={register}

            errors={errors.email}

            validation={{

              required: 'Email is required',

              pattern: {

                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                message: 'Invalid email address',

              },

            }}

          />

          <InputField

            name="password"

            label="Password"

            placeholder="Enter your password"

            type="password"

            register={register}

            errors={errors.password}

            validation={{

              required: 'Password is required',

              minLength: { value: 8, message: 'Password must be at least 8 characters' },

            }}

          />



          <SelectField

            name="country"

            label="Country"

            placeholder="Select your country"

            options={COUNTRIES}

            control={control}

            errors={errors.country}

            required

          />



          <SelectField

            name="investmentGoals"

            label="Investment Goals"

            placeholder="Select your investment goals"

            options={INVESTMENT_GOALS}

            control={control}

            errors={errors.investmentGoals}

            required

          />



          <SelectField

            name="riskTolerance"

            label="Risk Tolrence"

            placeholder="Select your risk tolerance"

            options={RISK_TOLERANCE_OPTIONS}

            control={control}

            errors={errors.riskTolerance}

            required

          />



          <SelectField

            name="preferredIndustry"

            label="preferred industry"

            placeholder="Select your preferred industry"

            options={PREFERRED_INDUSTRIES}

            control={control}

            errors={errors.preferredIndustry}

            required



          />



          <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">

            {isSubmitting ? 'Creating Account...' : 'Start your investment journey'}

          </Button>

          
       

          <FooterLink
            text="Already have an account?"
            linkText="Sign in"
            href="/signIn"
          />

        </form>

      </div>

    </DropdownProvider>

  );

};



export default signUp;