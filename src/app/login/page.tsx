'use client'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { PrimaryButton } from '@/components/ui/Button'

const LoginPage = () => {
    const { data: session, status } = useSession()

    if (session) {
        return redirect('/dashboard')
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
            <div className='h-24'>
                <img alt='logo' src='/ndg_MuseLab_Primary%20Logo_Gold%20_%20300px.png' />
            </div>
            <PrimaryButton
                type='button'
                label='Login'
                className='px-12 py-2.5'
                onClick={() => signIn('auth0', { showPrompt: true })}
            />
        </div>
    )
}

export default LoginPage
