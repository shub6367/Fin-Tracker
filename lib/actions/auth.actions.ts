'use server';
import { auth } from '@/lib/better-auth/auth';
import { inngest } from '@/lib/inngest/client';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpWithEmail = async ({email,password,fullname,country,investmentGoals,riskTolerance,preferredIndustry}) => 
    {
        console.log('Sign-up attempt started for email:', email);
        try{
            console.log('Calling auth.api.signUpEmail...');
            const response =await auth.api.signUpEmail({
                body:{email,password,name:fullname}
            
            })
            console.log('Auth response:', response);
            
            if(response){
                console.log('User created, sending inngest event...');
                await inngest.send({
                    name: 'app/user.created',
                    data:{
                        email,
                        name:fullname,
                        country,
                        investmentGoals,
                        riskTolerance,
                        preferredIndustry
                    }

                })
                console.log('Sign-up successful');
                return { success: true, data: response };
            } else {
                console.log('No response from auth API');
                return { success: false, error: 'Sign-up failed' };
            }
        }catch(error){
            console.error('Sign up failed with detailed error:', error);
            console.error('Error type:', typeof error);
            console.error('Error message:', error instanceof Error ? error.message : 'No error message');
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            return{ success:false, error: error instanceof Error ? error.message : 'sign Up failed'}
        }
    }
export const signInWithEmail = async ({email,password}) => 
    {
        console.log('Sign-in attempt started for email:', email);
        try{
            console.log('Calling auth.api.signInEmail...');
            const response =await auth.api.signInEmail({
                body:{email,password}
            })
            console.log('Sign-in response:', response);
            
            if(response) {
                console.log('Sign-in successful');
                return { success: true, data: response };
            } else {
                console.log('Sign-in failed: No response');
                return { success: false, error: 'Sign-in failed' };
            }

         } catch(error) {
            console.error('Sign In failed with detailed error:', error);
            console.error('Error type:', typeof error);
            console.error('Error message:', error instanceof Error ? error.message : 'No error message');
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            return{ success:false, error: error instanceof Error ? error.message : 'sign In failed'}
        }
    }


export const signOut = async ()=>{
    try{
        await auth.api.signOut({
            headers: await headers()
        })
        return{success:true}
    }catch(error){
        console.log('Sign out failed',error)
        return{success:false,error:'Sign out failed'}
    }
}    