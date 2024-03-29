'use client'
import { signIn } from "next-auth/react"
import { PrimaryButton } from "@/components/ui/Button"

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="h-24">
                <img alt="logo" src="/ndg_MuseLab_Primary%20Logo_Gold%20_%20300px.png" />
            </div>
            <PrimaryButton
                type="button"
                label="Login"
                className="px-12 py-2.5"
                onClick={() => signIn("auth0", { callbackUrl: "/dashboard", showPrompt: true })}
            />
        </div>
    )
}

export default LoginPage
