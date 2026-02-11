'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import InputField from '@/components/forms/inputField'
import { Button } from '@/components/ui/button'
import FooterLink from '@/components/forms/FooterLink'
import { signInWithEmail } from '@/lib/actions/auth.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'


interface SignInFormData {


  email: string;

  password: string;

}
const signIn = () => {
  const router = useRouter();



  const {

    register,

    handleSubmit,

    control,

    setValue,



    formState: { errors, isSubmitting },

  } = useForm<SignInFormData>({

    defaultValues: {


      email: '',

      password: '',



    },

    mode: 'onBlur',

  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {
      console.log('Submitting sign-in data:', data);
      const result = await signInWithEmail(data);
      console.log('Sign-in result:', result);
      
      if (result.success) {
        console.log('Redirecting to dashboard...');
        router.push('/');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error('Sign In failed', {
        description: error instanceof Error ? error.message : 'Failed to sign in',
      });
    }
  };




  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <h1 className="form-title">Log In Your Account</h1>


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

        }}

      />

      <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">

        {isSubmitting ? 'Signing In...' : 'Log In'}

      </Button>

      <FooterLink

        text="Don't have an account?"

        linkText="Create an Account"

        href="/signUp"

      />

    </form>



  );

};



export default signIn;